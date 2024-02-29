<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" :showOkBtn="false" width="1000px" destroyOnClose>
    <BasicTable @register="registerTable" :rowClassName="getRowClassName">
      <template #tableTitle>
        <div>截至统计到{{ dayjs().add(-1, 'day').format('YYYY-MM-DD') }}日的数据</div>
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
  import { detailColumns } from '../projectCostBoard.data';
  import { detailList } from '../projectCostBoard.api';
  import dayjs, { Dayjs } from 'dayjs';

  const { prefixCls } = useDesign('row-invalid');
  const projectName = ref('');

  const [registerModal] = useModalInner(async (data) => {
    projectName.value = data.record.projectName;
    setProps({ searchInfo: { projectId: unref(data.record.id) } });
    reload();
  });

  //设置标题  title="项目成本明细"
  const getTitle = computed(() => unref(projectName) + '--项目成本明细');

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
    let totals: any = { _row: '', key: -1, period: '分项合计' };

    totals['comprehensiveSubsidy'] = tableData.reduce((prev, next) => {
      if (!!next['comprehensiveSubsidy']) {
        prev += next['comprehensiveSubsidy'];
      }
      return prev;
    }, 0);
    totals['laborCost'] = tableData.reduce((prev, next) => {
      if (!!next['laborCost']) {
        prev += next['laborCost'];
      }
      return prev;
    }, 0);
    totals['workDays'] = tableData.reduce((prev, next) => {
      if (!!next['workDays']) {
        prev += next['workDays'];
      }
      return prev;
    }, 0);
    return [totals, { _row: '', key: -1, period: '合计', comprehensiveSubsidy: totals['comprehensiveSubsidy'] + totals['laborCost'] }];
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
