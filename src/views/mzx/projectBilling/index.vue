<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" :rowSelection="rowSelection">
    <!--插槽:table标题-->
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:dollar-circle-outlined" @click="handlePayment" v-auth="'project:payment'"> 发放项目</a-button>
    </template>
    <!--操作栏-->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
  <ProjectBillingDetail @register="registerDrawer" @success="handleSuccess" />
  <ProjectMemberList @register="registerMemberDrawer" />
  <PeojectScheduleList @register="registerScheduleDrawer" />
  <ProjectCostList @register="registerCostDrawer" />
</template>

<script lang="ts" name="biz-project" setup>
  //ts语法
  import { ref, computed, unref, toRaw } from 'vue';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { BasicTable, TableAction } from '/src/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import ProjectBillingDetail from './componets/ProjectBillingDetail.vue';
  import { columns, searchFormSchema } from './projectBilling.data';
  import { list, batchPaymentData, auditData } from './projectBilling.api';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  
  //drawer
  const [registerDrawer, { openDrawer }] = useDrawer();

  const userStore = useUserStore();

  // 列表页面公共参数、方法
  const { tableContext } = useListPage({
    designScope: 'project-billing-page',
    tableProps: {
      title: '项目成本列表',
      api: list,
      size: 'small',
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
        width: 200,
      },
    },
  });

  //注册table数据
  const [registerTable, { reload }, { rowSelection, selectedRowKeys, selectedRows }] = tableContext;

  const { createMessage } = useMessage();
  // 回款
  async function handlePayment() {
    let selectedDatas = toRaw(selectedRows.value);
    if (selectedDatas.length > 0) {
      for (let val of selectedDatas) {
        if (val.billingStatus != '20') {
          createMessage.error('选中数据中存在状态不是待发放的项目');
          break;
        }
      }
      await batchPaymentData({ ids: selectedRowKeys.value }, () => {
        selectedRowKeys.value = [];
        reload();
      });
    } else {
      createMessage.warn('请选择需要结算的项目');
    }
  }

  /**
   * 成功回调
   */
  function handleSuccess() {
    reload();
  }

  /**
   * 审核事件
   */
  async function handleAudit(record: Recordable) {
    await auditData({ id: record.id }, reload);
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    if (record.billingStatus === '1') {
      let resultData = [
        {
          label: '设置提成比例',
          onClick: handleAudit.bind(null, record),
        },
        {
          label: '审核通过',
          onClick: handleAudit.bind(null, record),
        },
      ];
      return resultData;
    } else if (record.billingStatus === '10') {
      let resultData = [
        {
          label: '设置提成比例',
          onClick: handleAudit.bind(null, record),
        },
      ];
      return resultData;
    }
    return null;
  }
</script>
