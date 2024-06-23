<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" :rowSelection="rowSelection">
    <!--插槽:table标题-->
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> 新增</a-button>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleRemedy"> 补录</a-button>
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
  <ScheduleLogDetail @register="registerDrawer" />
  <ScheduleLogDrawer @register="registerEditDrawer" @success="handleSuccess" />
</template>

<script lang="ts" setup>
  //ts语法
  import { ref, computed, unref } from 'vue';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { BasicTable, TableAction } from '/src/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import ScheduleLogDetail from './ScheduleLogDetail.vue';
  import ScheduleLogDrawer from './ScheduleLogDrawer.vue';
  import { scheduleColumns, searchScheduleFormSchema } from './ScheduleLog.data';
  import { scheduleList, deleteSchedule, batchScheduleDelete } from './ScheduleLog.api';

  //drawer
  const [registerDrawer, { openDrawer }] = useDrawer();
  //drawer
  const [registerEditDrawer, { openDrawer: openEditDrawer }] = useDrawer();

  // 列表页面公共参数、方法
  const { tableContext } = useListPage({
    designScope: 'schedulelog-page',
    tableProps: {
      title: '项目服务日志列表',
      api: scheduleList,
      size: 'small',
      // scroll: {
      //   x: 2000,
      //   y: 500,
      // },
      columns: scheduleColumns,
      showTableSetting: false,
      formConfig: {
        schemas: searchScheduleFormSchema,
        fieldMapToTime: [['createTime', ['beginDate', 'endDate'], 'YYYY-MM-DD']],
      },
      pagination: {
        pageSize: 50,
      },
      actionColumn: {
        // title: '操作',
        // dataIndex: 'action',
        // slots: { customRender: 'action' },
        // fixed: 'right',
        width: 60,
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
      remedy: false,
    });
  }
  /**
   * 补录事件
   */
  function handleRemedy() {
    openEditDrawer(true, {
      isUpdate: false,
      remedy: true,
    });
  }

  /**
   * 编辑事件
   */
  async function handleEdit(record: Recordable) {
    openEditDrawer(true, {
      isUpdate: true,
      remedy: false,
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
    await deleteSchedule({ id: record.id }, reload);
  }
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchScheduleDelete({ ids: selectedRowKeys.value }, () => {
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
