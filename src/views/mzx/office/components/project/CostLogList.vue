<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" :rowSelection="rowSelection">
    <!--插槽:table标题-->
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> 新增</a-button>
      <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="batchHandleDelete">
              <Icon icon="ant-design:delete-outlined" />
              删除
            </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          批量操作
          <Icon icon="ant-design:down-outlined" />
        </a-button>
      </a-dropdown>
    </template>
    <!--操作栏-->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
  <CostLogDetail @register="registerDrawer" />
  <CostLogDrawer @register="registerEditDrawer" @success="handleSuccess" />
</template>

<script lang="ts" name="cost-log" setup>
  //ts语法
  import { onBeforeMount, ref, computed, unref, toRaw } from 'vue';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { BasicTable, TableAction } from '/src/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { initDictOptions } from '/@/utils/dict';
  import { mapTableTotalSummary } from '/@/utils/common/compUtils';
  import dayjs, { Dayjs } from 'dayjs';
  import CostLogDetail from './CostLogDetail.vue';
  import CostLogDrawer from './CostLogDrawer.vue';
  import { searchFormSchema, getScheduleColumns } from './CostLog.data';
  import { costList, deleteCost, batchCostDelete, getExportUrl } from './CostLog.api';
  import { useUserStore } from '/@/store/modules/user';

  const userStore = useUserStore();
  //drawer
  const [registerDrawer, { openDrawer }] = useDrawer();
  //drawer
  const [registerEditDrawer, { openDrawer: openEditDrawer }] = useDrawer();

  const columns = ref<any[]>([]);
  const columnsCost = ref<any[]>([]);

  async function initDictData(): Promise<[]> {
    //根据字典Code, 初始化字典数组
    const dictData = await initDictOptions('project_cost_key');
    return dictData.reduce((prev, next) => {
      if (next) {
        prev.push({
          title: next['text'] || next['label'],
          dataIndex: +next['value'],
        });
      }
      return prev;
    }, []);
  }

  //初始化字典选项
  initDictData().then((res) => {
    columnsCost.value = res;
    columns.value = getScheduleColumns(res);
  });
  // ;
  // 列表页面公共参数、方法
  const { tableContext, onExportXls } = useListPage({
    designScope: 'costlog-page',
    tableProps: {
      title: '项目费用列表',
      pagination: {
        pageSize: 50,
      },
      api: costList,
      size: 'small',
      showTableSetting: false,
      columns: columns,
      formConfig: {
        schemas: searchFormSchema,
        fieldMapToTime: [['createTime', ['beginDate', 'endDate'], 'YYYY-MM-DD']],
      },
      rowKey: 'id',
      bordered: true,
      canResize: false,
      showSummary: true,
      summaryFunc: handleSummary,
      actionColumn: {
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
        fixed: 'right',
        width: 180,
      },
    },
    exportConfig: {
      name: '项目费用列表',
      url: getExportUrl,
    },
  });

  //注册table数据
  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  function handleSummary(tableData: Recordable[]) {
    const fieldKeys = toRaw(columnsCost.value).reduce((prev, next) => {
      if (next) {
        prev.push(next['dataIndex'] + '_cost');
      }
      return prev;
    }, []);
    // 可用工具方法自动计算合计
    // const totals = mapTableTotalSummary(tableData, fieldKeys);

    let totals: any = { _row: '', projectName: '合计' };
    fieldKeys.forEach((key) => {
      let tempValue = tableData.reduce((prev, next) => {
        if (!!next[key]) {
          prev += next[key];
        }
        return prev;
      }, 0);
      totals[key] = Number(tempValue).toFixed(2);
    });
    return [totals];
  }
  /**
   * 新增事件
   */
  function handleCreate() {
    openEditDrawer(true, {
      isUpdate: false,
    });
  }

  /**
   * 编辑事件
   */
  async function handleEdit(record: Recordable) {
    openEditDrawer(true, {
      isUpdate: true,
      showFooter: true,
      record: record,
    });
  }
  /**
   * 详情事件
   */
  async function handleDetail(record: Recordable) {
    openDrawer(true, {
      record: record,
    });
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteCost({ id: record.id }, reload);
  }
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchCostDelete({ ids: selectedRowKeys.value }, () => {
      selectedRowKeys.value = [];
      reload();
    });
  }

  /**
   * 成功回调
   */
  function handleSuccess() {
    reload();
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    let resultData = [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '确定删除吗?',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
    let resultNoData = [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
    ];
    if (userStore.getUserInfo.username === '880') {
      return resultData;
    }
    let currentPeriod = parseInt(dayjs().format('YYYYMM'));
    let dataPeriod = parseInt(record.period / 100);
    // 非本月 currentPeriod - dataPeriod != 0
    // todo 202403 限制到10号修改
    if (currentPeriod - dataPeriod != 0) {
      // 上一个月
      if (currentPeriod - dataPeriod === 1) {
        // 判定当前时间是否本月10号
        currentPeriod = currentPeriod * 100 + 10;
        if (currentPeriod < parseInt(dayjs().format('YYYYMMDD'))) {
          return resultNoData;
        }
      } else {
        return resultNoData;
      }
    }
    return resultData;
  }
</script>
<style>
  .ant-table.ant-table-middle .ant-table-footer {
    padding-left: 0px;
    padding-right: 0px;
  }
</style>
