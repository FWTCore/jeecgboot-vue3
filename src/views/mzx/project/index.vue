<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" :rowSelection="rowSelection">
    <!--插槽:table标题-->
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> 新增</a-button>
      <a-button type="primary" preIcon="ant-design:dollar-circle-outlined" @click="handleCreate" v-auth="'project:payment'"> 结算</a-button>
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
  <ProjectDrawer @register="registerDrawer" @success="handleSuccess" />
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
  import ProjectDrawer from './componets/ProjectDrawer.vue';
  import ProjectMemberList from './componets/ProjectMemberList.vue';
  import PeojectScheduleList from './componets/PeojectScheduleList.vue';
  import ProjectCostList from './componets/ProjectCostList.vue';
  import { columns, searchFormSchema } from './Project.data';
  import { list, deleteData, batchDeleteData, finishData } from './Project.api';
  import { useUserStore } from '/@/store/modules/user';
  import { usePermission } from '/@/hooks/web/usePermission';
  
  const { hasPermission } = usePermission();
  //drawer
  const [registerDrawer, { openDrawer }] = useDrawer();

  //drawer
  const [registerMemberDrawer, { openDrawer: openMemberDrawer }] = useDrawer();
  const [registerScheduleDrawer, { openDrawer: openScheduleDrawer }] = useDrawer();
  const [registerCostDrawer, { openDrawer: openCostDrawer }] = useDrawer();
  const userStore = useUserStore();

  // 列表页面公共参数、方法
  const { tableContext } = useListPage({
    designScope: 'project-page',
    tableProps: {
      title: '项目列表',
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
    openDrawer(true, {
      isUpdate: false,
      showFooter: true,
    });
  }
  /**
   * 编辑事件
   */
  async function handleEdit(record: Recordable) {
    openDrawer(true, {
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
      isUpdate: true,
      showFooter: false,
      record: record,
    });
  }
  /**
   * 配置团队成员
   */
  async function handleMember(record: Recordable) {
    openMemberDrawer(true, {
      record: record,
    });
  }

  /**
   * 项目进度
   */
  function handleSchedule(record) {
    openScheduleDrawer(true, {
      record: record,
    });
  }
  /**
   * 项目费用
   */
  function handleCost(record) {
    openCostDrawer(true, {
      record: record,
    });
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteData({ id: record.id }, reload);
  }
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDeleteData({ ids: selectedRowKeys.value }, () => {
      selectedRowKeys.value = [];
      reload();
    });
  }
  /**
   * 完成事件
   */
  async function handleFinish(record) {
    await finishData({ id: record.id }, reload);
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
    if (record.projectStatus === '1') {
      let resultData = [
        {
          label: '编辑',
          onClick: handleEdit.bind(null, record),
        },
      ];
      if (record.leaderId === userStore.getUserInfo.id) {
        resultData.push({
          label: '已完结',
          onClick: handleFinish.bind(null, record),
        });
      }
      return resultData;
    }
    return null;
  }

  /**
   * 操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '项目成员',
        onClick: handleMember.bind(null, record),
      },
      {
        label: '项目进度',
        onClick: handleSchedule.bind(null, record),
      },
      // {
      //   label: '项目费用',
      //   onClick: handleCost.bind(null, record),
      // },
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
