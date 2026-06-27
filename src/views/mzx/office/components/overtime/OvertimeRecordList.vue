<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" :rowSelection="rowSelection">
    <!--插槽:table标题-->
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> 加班申请</a-button>
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
  <OvertimeRecordDetail @register="registerDrawer" />
  <OvertimeRecordDrawer @register="registerEditDrawer" @success="handleSuccess" />
</template>

<script lang="ts" setup>
  //ts语法
  import { ref, computed, unref } from 'vue';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { BasicTable, TableAction } from '/src/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { usePermission } from '/@/hooks/web/usePermission';
  import OvertimeRecordDetail from './OvertimeRecordDetail.vue';
  import OvertimeRecordDrawer from './OvertimeRecordDrawer.vue';
  import { overtimeColumns, searchOvertimeFormSchema } from './OvertimeRecord.data';
  import { overtimeList, deleteOvertime, batchDeleteOvertime, confirmOvertime } from './OvertimeRecord.api';

  //drawer
  const [registerDrawer, { openDrawer }] = useDrawer();
  //drawer
  const [registerEditDrawer, { openDrawer: openEditDrawer }] = useDrawer();

  // 权限判断
  const { hasPermission } = usePermission();

  // 列表页面公共参数、方法
  const { tableContext } = useListPage({
    designScope: 'overtime-page',
    tableProps: {
      title: '加班记录列表',
      api: overtimeList,
      size: 'small',
      columns: overtimeColumns,
      showTableSetting: false,
      formConfig: {
        schemas: searchOvertimeFormSchema,
        fieldMapToTime: [['overtimeDate', ['overtimeDateBegin', 'overtimeDateEnd'], 'YYYY-MM-DD']],
      },
      pagination: {
        pageSize: 50,
      },
      actionColumn: {
        width: 180,
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
    await deleteOvertime({ id: record.id }, reload);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDeleteOvertime({ ids: selectedRowKeys.value }, () => {
      selectedRowKeys.value = [];
      reload();
    });
  }

  /**
   * 确认事件
   */
  async function handleConfirm(record) {
    await confirmOvertime({ id: record.id });
    reload();
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
    const actions = [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
        ifShow: () => record.confirmStatus === 0, // 仅待确认可编辑
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
        ifShow: () => record.confirmStatus === 0, // 仅待确认可删除
      },
    ];

    // 确认按钮（需要权限）
    if (hasPermission('office:management')) {
      actions.push({
        label: '确认',
        popConfirm: {
          title: '确定确认吗?',
          confirm: handleConfirm.bind(null, record),
        },
        ifShow: () => record.confirmStatus === 0,
      });
    }

    return actions;
  }
</script>