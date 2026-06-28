<template>
  <div class="p-4">
    <!-- 主列表表格 -->
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <!-- 总调休列 - 可点击 -->
        <template v-if="column.dataIndex === 'totalOvertimeHours'">
          <span class="clickable-cell" @click="handleShowOvertime(record, 'all')">
            {{ formatNumber(record.totalOvertimeHours) }}
          </span>
        </template>
        <!-- 待确认调休列 - 可点击 -->
        <template v-if="column.dataIndex === 'pendingOvertimeHours'">
          <span class="clickable-cell" @click="handleShowOvertime(record, 'pending')">
            {{ formatNumber(record.pendingOvertimeHours) }}
          </span>
        </template>
        <!-- 已确认调休列 - 可点击 -->
        <template v-if="column.dataIndex === 'confirmedOvertimeHours'">
          <span class="clickable-cell" @click="handleShowOvertime(record, 'confirmed')">
            {{ formatNumber(record.confirmedOvertimeHours) }}
          </span>
        </template>
        <!-- 已使用调休列 - 可点击 -->
        <template v-if="column.dataIndex === 'usedLeaveHours'">
          <span class="clickable-cell" @click="handleShowLeaveRecord(record)">
            {{ formatNumber(record.usedLeaveHours) }}
          </span>
        </template>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>

    <!-- 加班记录弹窗 -->
    <OvertimeRecordModal @register="registerOvertimeModal" @success="handleSuccess" />

    <!-- 调休使用记录弹窗 -->
    <LeaveRecordModal @register="registerLeaveModal" />

    <!-- 录入调休抽屉 -->
    <LeaveRecordDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="mzx-employee-leave" setup>
  import { useListPage } from '/@/hooks/system/useListPage';
  import { BasicTable, TableAction } from '/src/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import OvertimeRecordModal from './components/OvertimeRecordModal.vue';
  import LeaveRecordModal from './components/LeaveRecordModal.vue';
  import LeaveRecordDrawer from './components/LeaveRecordDrawer.vue';
  import { statisticsColumns, searchFormSchema } from './EmployeeLeave.data';
  import { getStatisticsList } from './EmployeeLeave.api';

  // 注册加班记录弹窗
  const [registerOvertimeModal, { openModal: openOvertimeModal }] = useModal();

  // 注册调休使用记录弹窗
  const [registerLeaveModal, { openModal: openLeaveModal }] = useModal();

  // 注册录入调休抽屉
  const [registerDrawer, { openDrawer }] = useDrawer();

  // 列表页面配置
  const { tableContext } = useListPage({
    designScope: 'employee-leave-page',
    tableProps: {
      title: '员工调休统计',
      api: getStatisticsList,
      size: 'small',
      columns: statisticsColumns,
      showTableSetting: false,
      formConfig: {
        schemas: searchFormSchema,
      },
      pagination: {
        pageSize: 20,
      },
      actionColumn: {
        width: 100,
        fixed: 'right',
      },
    },
  });

  // 注册表格
  const [registerTable, { reload }] = tableContext;

  /**
   * 格式化数字显示
   */
  function formatNumber(value: number | undefined) {
    return value?.toFixed(1) || '0.0';
  }

  /**
   * 显示加班记录弹窗
   * @param record 员工记录
   * @param type 类型：all-全部, pending-待确认, confirmed-已确认
   */
  function handleShowOvertime(record: Recordable, type: string) {
    let confirmStatus: string | null = null;
    if (type === 'pending') {
      confirmStatus = '0';
    } else if (type === 'confirmed') {
      confirmStatus = '1';
    }

    openOvertimeModal(true, {
      staffId: record.employeeId,
      staffName: record.employeeName,
      confirmStatus,
    });
  }

  /**
   * 显示调休使用记录弹窗
   * @param record 员工记录
   */
  function handleShowLeaveRecord(record: Recordable) {
    openLeaveModal(true, {
      staffId: record.employeeId,
      staffName: record.employeeName,
    });
  }

  /**
   * 操作列按钮
   */
  function getTableAction(record: Recordable) {
    return [
      {
        label: '录入调休',
        onClick: handleAddLeaveForEmployee.bind(null, record),
      },
    ];
  }

  /**
   * 为特定员工录入调休
   */
  function handleAddLeaveForEmployee(record: Recordable) {
    openDrawer(true, {
      isUpdate: false,
      staffId: record.employeeId,
      staffName: record.employeeName,
    });
  }

  /**
   * 成功回调 - 刷新列表
   */
  function handleSuccess() {
    reload();
  }
</script>

<style lang="less" scoped>
  .clickable-cell {
    cursor: pointer;
    color: #1890ff;
    &:hover {
      text-decoration: underline;
    }
  }
</style>