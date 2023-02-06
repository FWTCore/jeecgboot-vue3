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
</template>

<script lang="ts" name="system-dict" setup>
  //ts语法
  import { ref, computed, unref } from 'vue';
  import { BasicTable, TableAction, ActionItem } from '/src/components/Table';
  import { useModal } from '/src/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import CustomerModel from './componets/CustomerModel.vue';
  import { columns, searchFormSchema } from './Customer.data';
  import { syncuft, list } from './Customer.api';

  const [registerModal, { openModal }] = useModal();

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
      actionColumn: {
        width: 240,
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
   * 成功回调
   */
  function handleSuccess() {
    reload();
  }
</script>
