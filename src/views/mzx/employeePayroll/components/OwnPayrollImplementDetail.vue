<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" :showOkBtn="false" width="1000px" destroyOnClose>
    <BasicTable @register="registerTable" :rowClassName="getRowClassName">
      <template #tableTitle>
        <div>若有问题请于每月20号前反馈</div>
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, computed, toRaw } from 'vue';
  import { BasicModal, useModalInner } from '/src/components/Modal';
  import { BasicTable, useTable } from '/src/components/Table';
  import { ColEx } from '/@/components/Form/src/types';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { detailColumns } from '../OwnPayroll.data';
  import { detailList } from '../OwnPayroll.api';

  const { prefixCls } = useDesign('row-invalid');
  const period = ref('');

  const [registerModal] = useModalInner(async (data) => {
    period.value = data.record.period;
    setProps({ searchInfo: { period: unref(data.record.period) } });
    reload();
  });

  //设置标题  title="项目成本明细"
  const getTitle = computed(() => unref(period) + '--项目提成明细');

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
    columns: detailColumns,
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
    let totals: any = { _row: '', key: -1, period: '合计' };

    totals['implementCommission'] = tableData.reduce((prev, next) => {
      if (!!next['implementCommission']) {
        prev += next['implementCommission'];
      }
      return prev;
    }, 0);
    return [totals];
  }

  function getRowClassName(record) {
    return record.status == 0 ? prefixCls : '';
  }
</script>
<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-row-invalid';

  :deep(.@{prefix-cls}) {
    background: #f4f4f4;
    color: #bababa;
  }
</style>
