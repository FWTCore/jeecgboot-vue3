<template>
  <!--引用表格-->
  <BasicTable @register="registerTable">
    <!--插槽:table标题-->
    <template #tableTitle>
      <div>每月工资若有问题请于每月10号前反馈，项目提成若有问题请于每月20号前反馈</div>
    </template>
    <template #implementCommission="{ record }">
      <a-button type="link" class="ml-2" v-if="record.billingStatus != 1" @click="handleProjectCommissionDetail(record, false)">
        {{ record.implementCommission }}
      </a-button>
    </template>
    <!--操作栏-->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
  <OwnPayrollImplementDetail @register="registerModal" />
  <OwnPayrollDetail @register="registerDrawer" />
</template>

<script lang="ts" name="mzx-own-payroll" setup>
  //ts语法
  import { ref, computed, unref } from 'vue';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { BasicTable, TableAction } from '/src/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import OwnPayrollImplementDetail from './components/OwnPayrollImplementDetail.vue';
  import OwnPayrollDetail from './components/OwnPayrollDetail.vue';
  import { payrollColumns, searchpayrollColumns } from './OwnPayroll.data';
  import { ownPayrollList } from './OwnPayroll.api';

  //drawer
  const [registerDrawer, { openDrawer }] = useDrawer();
  //弹窗model
  const [registerModal, { openModal }] = useModal();

  // 列表页面公共参数、方法
  const { tableContext } = useListPage({
    designScope: 'own-payroll-page',
    tableProps: {
      title: '员工本人工资列表',
      api: ownPayrollList,
      size: 'small',
      columns: payrollColumns,
      showTableSetting: false,
      formConfig: {
        schemas: searchpayrollColumns,
      },
      pagination: {
        pageSize: 50,
      },
      actionColumn: {
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
        fixed: 'right',
        width: 70,
      },
    },
  });

  /**
   * 明细
   */
  function handleProjectCommissionDetail(record) {
    openModal(true, {
      record,
      showFooter: true,
    });
  }
  //注册table数据
  const [registerTable, { reload }] = tableContext;

  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
    ];
  }

  /**
   * 详情事件
   */
  async function handleDetail(record) {
    openDrawer(true, {
      record: record,
    });
  }
</script>
