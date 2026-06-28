<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" :rowSelection="rowSelection">
    <!--插槽:table标题-->
    <template #tableTitle>
      <div class="leave-stats-wrapper">
        <div class="leave-stats">
          <span class="stats-title">我的调休：</span>
          <span class="stats-item">总调休 <strong>{{ leaveStats.totalOvertimeHours || 0 }}</strong> 小时</span>
          <span class="stats-item">待确认调休 <strong>{{ leaveStats.pendingOvertimeHours || 0 }}</strong> 小时</span>
          <span class="stats-item">已确认调休 <strong>{{ leaveStats.confirmedOvertimeHours || 0 }}</strong> 小时</span>
          <span class="stats-item clickable" @click="handleShowLeaveRecord">
            已使用调休 <strong>{{ leaveStats.usedLeaveHours || 0 }}</strong> 小时
            <Icon icon="ant-design:eye-outlined" class="view-icon" />
          </span>
          <span class="stats-item">剩余调休 <strong>{{ remainingLeaveHours }}</strong> 小时</span>
        </div>
        <div class="action-buttons">
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
        </div>
      </div>
    </template>
    <!--操作栏-->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
  <OvertimeRecordDetail @register="registerDrawer" />
  <OvertimeRecordDrawer @register="registerEditDrawer" @success="handleSuccess" />
  <LeaveRecordModal @register="registerLeaveModal" />
</template>

<script lang="ts" setup>
  //ts语法
  import { ref, computed, onMounted } from 'vue';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useUserStore } from '/@/store/modules/user';
  import { Icon } from '/@/components/Icon';
  import { useModal } from '/@/components/Modal';
  import OvertimeRecordDetail from './OvertimeRecordDetail.vue';
  import OvertimeRecordDrawer from './OvertimeRecordDrawer.vue';
  import LeaveRecordModal from '/@/views/mzx/employeeLevel/components/LeaveRecordModal.vue';
  import { overtimeColumns, searchOvertimeFormSchema } from './OvertimeRecord.data';
  import { overtimeList, deleteOvertime, batchDeleteOvertime, confirmOvertime } from './OvertimeRecord.api';
  import { getStatisticsList } from '/@/views/mzx/employeeLevel/EmployeeLeave.api';

  //drawer
  const [registerDrawer, { openDrawer }] = useDrawer();
  //drawer
  const [registerEditDrawer, { openDrawer: openEditDrawer }] = useDrawer();
  //modal
  const [registerLeaveModal, { openModal: openLeaveModal }] = useModal();

  // 权限判断
  const { hasPermission } = usePermission();

  // 用户信息
  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);

  // 调休统计信息
  const leaveStats = ref({
    totalOvertimeHours: 0,
    pendingOvertimeHours: 0,
    confirmedOvertimeHours: 0,
    usedLeaveHours: 0,
  });

  // 计算剩余调休
  const remainingLeaveHours = computed(() => {
    return (leaveStats.value.confirmedOvertimeHours || 0) - (leaveStats.value.usedLeaveHours || 0);
  });

  // 加载调休统计信息
  async function loadLeaveStats() {
    try {
      const userId = userinfo.value.id;
      const result = await getStatisticsList({ employeeId: userId, pageNo: 1, pageSize: 1 });
      if (result && result.records && result.records.length > 0) {
        const stats = result.records[0];
        leaveStats.value = {
          totalOvertimeHours: stats.totalOvertimeHours || 0,
          pendingOvertimeHours: stats.pendingOvertimeHours || 0,
          confirmedOvertimeHours: stats.confirmedOvertimeHours || 0,
          usedLeaveHours: stats.usedLeaveHours || 0,
        };
      }
    } catch (e) {
      console.error('获取调休统计失败', e);
    }
  }

  // 页面加载时获取统计信息
  onMounted(() => {
    loadLeaveStats();
  });

  /**
   * 显示调休使用记录弹窗
   */
  function handleShowLeaveRecord() {
    openLeaveModal(true, {
      staffId: userinfo.value.id,
      staffName: userinfo.value.realname,
    });
  }

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
    // 确认后刷新统计信息
    loadLeaveStats();
  }

  /**
   * 成功回调
   */
  function handleSuccess() {
    reload();
    // 新增/编辑后刷新统计信息
    loadLeaveStats();
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

<style lang="less" scoped>
  .leave-stats-wrapper {
    margin-bottom: 16px;
  }
  .leave-stats {
    padding: 8px 0;
    font-size: 14px;
    margin-bottom: 12px;
  }
  .stats-title {
    font-weight: 600;
    color: #333;
    margin-right: 16px;
  }
  .stats-item {
    margin-right: 20px;
    color: #666;
    strong {
      color: #1890ff;
      font-size: 16px;
      margin: 0 2px;
    }
  }
  .stats-item.clickable {
    cursor: pointer;
    color: #1890ff;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
    transition: all 0.3s;
    &:hover {
      background-color: #bae7ff;
      border-color: #69c0ff;
      strong {
        text-decoration: underline;
      }
    }
    .view-icon {
      margin-left: 4px;
      font-size: 12px;
    }
  }
  .action-buttons {
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>