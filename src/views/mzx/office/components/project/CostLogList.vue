<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" :rowSelection="rowSelection">
    <!--插槽:table标题-->
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> 新增</a-button>
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
      <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
    </template>
  </BasicTable>
  <!-- <ScheduleLogDetail @register="registerDrawer" /> -->
  <!-- <ScheduleLogDrawer @register="registerEditDrawer" @success="handleSuccess" /> -->
</template>

<script lang="ts" name="cost-log" setup>
  //ts语法
  import { onBeforeMount, ref, computed, unref, toRaw } from 'vue';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { BasicTable, TableAction } from '/src/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { initDictOptions } from '/@/utils/dict';
  import ScheduleLogDetail from './ScheduleLogDetail.vue';
  import ScheduleLogDrawer from './ScheduleLogDrawer.vue';
  import { searchFormSchema, getBasicColumns } from './CostLog.data';
  import { costList, deleteCost, batchCostDelete } from './CostLog.api';

  //drawer
  const [registerDrawer, { openDrawer }] = useDrawer();
  //drawer
  const [registerEditDrawer, { openDrawer: openEditDrawer }] = useDrawer();

  const columns = ref<any[]>([]);

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
    columns.value = getBasicColumns(res);
  });
  // ;
  // 列表页面公共参数、方法
  const { tableContext } = useListPage({
    designScope: 'costlog-page',
    tableProps: {
      title: '项目费用列表',
      api: costList,
      columns: columns,
      formConfig: {
        schemas: searchFormSchema,
      },
      actionColumn: {
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
        fixed: 'right',
      },
    },
  });

  //注册table数据
  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

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
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
    ];
  }

  /**
   * 操作栏
   */
  function getDropDownAction(record) {
    return [
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
  }
</script>
