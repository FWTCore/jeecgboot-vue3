<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" :showOkBtn="false" width="1000px" destroyOnClose>
    <BasicTable @register="registerTable" :beforeEditSubmit="beforeEditSubmit" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, computed, toRaw } from 'vue';
  import { BasicModal, useModalInner } from '/src/components/Modal';
  import { BasicTable, useTable } from '/src/components/Table';
  import { ColEx } from '/@/components/Form/src/types';
  import { getStaffColumns } from '../projectBilling.data';
  import { detailList, participantsList, saveProjectBilling } from '../projectBilling.api';
  import { useMessage } from '/@/hooks/web/useMessage';

  const projectName = ref('');
  const projectId = ref('');
  const columns = ref<any[]>([]);
  const columnsStaff = ref<any[]>([]);
  const implementCommission = ref<any[]>([]);
  const billingStatus = ref<any[]>([]);

  async function initStaffData(): Promise<[]> {
    return participantsList({ projectId: toRaw(projectId.value) });
  }

  const [registerModal] = useModalInner(async (data) => {
    projectName.value = data.record.projectName;
    projectId.value = data.record.projectId;
    implementCommission.value = data.record.implementCommission;
    billingStatus.value = data.record.billingStatus;
    setProps({ searchInfo: { projectId: unref(data.record.projectId) } });

    initStaffData().then((res) => {
      columnsStaff.value = res;
      columns.value = getStaffColumns(res, toRaw(billingStatus.value));
    });
    reload();
  });

  //设置标题  title="项目成本明细"
  const getTitle = computed(() => unref(projectName) + '--项目成本明细');

  const { createMessage } = useMessage();

  // 自适应列配置
  const adaptiveColProps: Partial<ColEx> = {
    xs: 24, // <576px
    sm: 24, // ≥576px
    md: 24, // ≥768px
    lg: 12, // ≥992px
    xl: 12, // ≥1200px
    xxl: 8, // ≥1600px
  };
  const [registerTable, { reload, setProps }] = useTable({
    api: detailList,
    columns: columns,
    striped: true,
    useSearchForm: false,
    showTableSetting: false,
    clickToRowSelect: false,
    bordered: true,
    showIndexColumn: false,
    tableSetting: { fullScreen: true },
    canResize: false,
    pagination: {
      pageSize: 50,
    },
    formConfig: {
      baseColProps: adaptiveColProps,
      labelAlign: 'right',
      labelCol: {
        offset: 1,
        xs: 24,
        sm: 24,
        md: 24,
        lg: 9,
        xl: 7,
        xxl: 4,
      },
      wrapperCol: {},
      autoSubmitOnEnter: true,
    },
    immediate: false,
    showActionColumn: false,
    showSummary: true,
    summaryFunc: handleSummary,
  });
  function handleSummary(tableData: Recordable[]) {
    let commission = Number(toRaw(implementCommission.value));
    if (isNaN(commission)) {
      commission = 0;
    }
    let totals: any = { key: -1, scheduleName: '合计' };
    let commissions: any = { key: -2, scheduleName: '提成金额', itemCommission: commission };

    totals['itemCommission'] = tableData.reduce((prev, next) => {
      if (!!next['itemCommission']) {
        prev += next['itemCommission'];
      }
      return prev;
    }, 0);

    const fieldKeys = getFieldKeys();
    fieldKeys.forEach((key) => {
      totals[key] = tableData.reduce((prev, next) => {
        if (!!next[key]) {
          prev += next[key];
        }
        return prev;
      }, 0);
      commissions[key] = (totals[key] * (commission / 100)).toFixed(2);
    });
    return [totals, commissions];
  }

  function getFieldKeys() {
    const fieldKeys = toRaw(columnsStaff.value).reduce((prev, next) => {
      if (next) {
        prev.push('commission_' + next['staffId']);
      }
      return prev;
    }, []);
    return fieldKeys;
  }
  async function beforeEditSubmit({ record, index, key, value }) {
    let totalCommission = record.itemCommission ? record.itemCommission : 0;
    if (Number(totalCommission) < Number(value)) {
      createMessage.error(record.scheduleName + '人员设置分配比例超过了最大值[' + totalCommission + '%]');
      return false;
    } else {
      await saveProjectBilling(
        { projectId: toRaw(projectId.value), projectScheduleUsageItemId: record.projectScheduleUsageItemId, key, value },
        () => {
          reload();
        }
      );
      return true;
    }
  }
</script>
<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-row-invalid';

  :deep(.@{prefix-cls}) {
    background: #f4f4f4;
    color: #bababa;
  }
</style>
