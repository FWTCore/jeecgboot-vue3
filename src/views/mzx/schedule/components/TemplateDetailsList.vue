<template>
  <!--引用表格-->
  <BasicTable
    @register="registerTable"
    :expandedRowKeys="expandedRowKeys"
    :rowSelection="rowSelection"
    @expand="handleExpand"
    @fetch-success="clickFetchSuccess"
  >
    <!--插槽:table标题-->
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="createUser">新建</a-button>
      <template v-if="selectedRowKeys.length > 0">
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined" />
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>
            <span>批量操作 </span>
            <icon icon="akar-icons:chevron-down" />
          </a-button>
        </a-dropdown>
      </template>
    </template>
    <!-- 插槽：行内操作按钮 -->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { ActionItem, BasicTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { useListPage } from '/@/hooks/system/useListPage';

  // import UserDrawer from '/@/views/system/user/UserDrawer.vue';
  import { ColEx } from '/@/components/Form/src/types';
  import { itemColumns, itemSearchFormSchema, detailColumns } from '../Template.data';
  import { itemList } from '../Template.api';

  const props = defineProps({
    templateId: { require: true, type: String },
  });

  // 展开key
  const expandedRowKeys = ref<any[]>([]);
  // 子表数据
  const innerData = ref<any>();

  // 当前选中的模板Id
  const templateId = computed(() => props.templateId);

  // 自适应列配置
  const adaptiveColProps: Partial<ColEx> = {
    xs: 24, // <576px
    sm: 24, // ≥576px
    md: 24, // ≥768px
    lg: 12, // ≥992px
    xl: 12, // ≥1200px
    xxl: 8, // ≥1600px
  };
  // 列表页面公共参数、方法
  const { tableContext, createMessage } = useListPage({
    tableProps: {
      api: itemList,
      columns: itemColumns,
      canResize: false,
      formConfig: {
        schemas: itemSearchFormSchema,
        baseColProps: adaptiveColProps,
        labelAlign: 'left',
        labelCol: {
          xs: 24,
          sm: 24,
          md: 24,
          lg: 9,
          xl: 7,
          xxl: 5,
        },
        wrapperCol: {},
        // 操作按钮配置
        actionColOptions: {
          ...adaptiveColProps,
          style: { textAlign: 'left' },
        },
      },
      // 请求之前对参数做处理
      beforeFetch(params) {
        params.projectScheduleTemplateId = templateId.value;
      },
    },
  });

  // 注册 ListTable
  const [registerTable, { reload, updateTableDataRecord }, { rowSelection, selectedRowKeys }] = tableContext;

  watch(
    () => props.templateId,
    () => reload()
  );
  //注册drawer
  const [registerDrawer, { openDrawer }] = useDrawer();

  // 创建用户
  function createUser() {
    if (!templateId.value) {
      createMessage.warning('请先选择一个模板');
    } else {
      // openDrawer(true, {
      //   isUpdate: false,
      //   departDisabled: true,
      //   // 初始化负责部门
      //   nextDepartOptions: { value: props.data?.key, label: props.data?.title },
      //   record: {
      //     activitiSync: 1,
      //     userIdentity: 1,
      //     selecteddeparts: templateId.value,
      //   },
      // });
    }
  }

  // 查看用户详情
  function showUserDetail(record) {
    // openDrawer(true, {
    //   record,
    //   isUpdate: true,
    //   departDisabled: true,
    //   showFooter: false,
    // });
  }

  /**
   * 用户抽屉表单成功回调
   */
  function onUserDrawerSuccess({ isUpdate, values }) {
    // isUpdate ? updateTableDataRecord(values.id, values) : reload();
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
        label: '删除',
        popConfirm: {
          title: '确定删除吗?',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
  /**
   * 编辑事件
   */
  async function handleEdit(record: Recordable) {
    // openModal(true, {
    //   record,
    //   isUpdate: true,
    // });
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    // await deleteData({ id: record.id }, reload);
  }
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    // await batchDeleteData({ ids: selectedRowKeys.value }, reload);
  }
  /**
   * 成功回调
   */
  function handleSuccess() {
    reload();
  }

  /**
   * 展开事件
   * */
  function handleExpand(expanded, record) {
    innerData.value = [];
    expandedRowKeys.value = [];
    if (expanded === true) {
      expandedRowKeys.value.push(record.id);
      innerData.value = itemList({ parentId: record.id, projectScheduleTemplateId: templateId.value });
    }
  }
  /**
   * 加载完成事件
   */
  function clickFetchSuccess() {
    innerData.value = [];
    expandedRowKeys.value = [];
  }
</script>
