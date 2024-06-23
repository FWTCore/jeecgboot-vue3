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
            <a-menu-item key="1" @click="batchHandleEffect">
              <Icon icon="ant-design:check-square-outlined" />
              生效
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
  <EmployeePayrollDetail @register="registerDrawer" />
  <EmployeePayrollDrawer @register="registerEditDrawer" @success="handleSuccess" />
</template>

<script lang="ts" name="mzx-employee-payroll" setup>
  //ts语法
  import { ref, computed, unref } from 'vue';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { BasicTable, TableAction } from '/src/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import EmployeePayrollDetail from './components/EmployeePayrollDetail.vue';
  import EmployeePayrollDrawer from './components/EmployeePayrollDrawer.vue';
  import { payrollColumns, searchpayrollColumns } from './EmployeePayroll.data';
  import { employeePayrollList, employeePayrollDelete, employeePayrollBathDelete, employeePayrollEffect, employeePayrollBathEffect, getExportUrl } from './EmployeePayroll.api';

  //drawer
  const [registerDrawer, { openDrawer }] = useDrawer();
  //drawer
  const [registerEditDrawer, { openDrawer: openEditDrawer }] = useDrawer();

  // 列表页面公共参数、方法
  const { tableContext, onExportXls } = useListPage({
    designScope: 'employee-payroll-page',
    tableProps: {
      title: '员工工资列表',
      api: employeePayrollList,
      size: 'small',
      columns: payrollColumns,
      showTableSetting: false,
      formConfig: {
        schemas: searchpayrollColumns,
        fieldMapToTime: [['createTime', ['beginDate', 'endDate'], 'YYYY-MM-DD']],
      },
      pagination: {
        pageSize: 50,
      },
      actionColumn: {
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
        fixed: 'right',
        width: 100,
      },
    },
    exportConfig: {
      name: '员工工资列表',
      url: getExportUrl,
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
   * 生效事件
   */
  async function handleEffect(record: Recordable) {
    await employeePayrollEffect({ id: record.id }, reload);
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await employeePayrollDelete({ id: record.id }, reload);
  }
  /**
   * 详情事件
   */
   async function handleDetail(record) { 
    openDrawer(true, {
      record: record,
    });
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await employeePayrollBathDelete({ ids: selectedRowKeys.value }, () => {
      selectedRowKeys.value = [];
      reload();
    });
  }
  /**
   * 批量删除事件
   */
  async function batchHandleEffect() {
    await employeePayrollBathEffect({ ids: selectedRowKeys.value }, () => {
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
    if (record.payrollStatus === 1) {
      return [
        {
          label: '生效',
          onClick: handleEffect.bind(null, record),
        },
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
    } else {
      return [
        {
          label: '详情',
          onClick: handleDetail.bind(null, record),
        },
      ];
    }
  }
</script>
