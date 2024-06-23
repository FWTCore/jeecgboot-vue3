<template>
  <!--引用表格-->
  <BasicTable @register="registerTable">
    <!--插槽:table标题-->
    <template #tableTitle>
      <a-button type="primary" @click="handleSyncUser" preIcon="ant-design:sync-outlined"> 同步客户</a-button>
    </template>
    <!--操作栏-->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
  <CustomerModel @register="registerModal" @success="handleSuccess" />
  <CustomerServcieLogList @register="registerDrawer" />
</template>

<script lang="ts" name="mzx-customer" setup>
  //ts语法
  import { ref, computed, unref } from 'vue';
  import { BasicTable, TableAction, ActionItem } from '/src/components/Table';
  import { useModal } from '/src/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import { useListPage } from '/@/hooks/system/useListPage';
  import CustomerModel from './componets/CustomerModel.vue';
  import CustomerServcieLogList from './componets/CustomerServcieLogList.vue';
  import { columns, searchFormSchema } from './Customer.data';
  import { syncuft, list } from './Customer.api';

  const [registerModal, { openModal }] = useModal();
  //drawer
  const [registerDrawer, { openDrawer }] = useDrawer();

  // 列表页面公共参数、方法
  const { tableContext } = useListPage({
    designScope: 'customer-page',
    tableProps: {
      title: '客户列表 ',
      api: list,
      columns: columns,
      formConfig: {
        schemas: searchFormSchema,
      },
      pagination: {
        pageSize: 50,
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
  const [registerTable, { reload }] = tableContext;

  /**
   *同步
   */
  function handleSyncUser() {
    syncuft();
  }
  /**
   * 操作栏
   */
  function getTableAction(record): ActionItem[] {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: '服务记录',
        onClick: handleServiceLog.bind(null, record),
      },
    ];
  }
  /**
   * 编辑事件
   */
  async function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }
  /**
   * 服务记录事件
   */
  async function handleServiceLog(record: Recordable) {
    openDrawer(true, {
      record,
    });
  }
  /**
   * 成功回调
   */
  function handleSuccess() {
    reload();
  }
</script>
