<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" :rowSelection="rowSelection">
    <!--插槽:table标题-->
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="createItem">新增</a-button>
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
      <!-- :dropDownActions="getDropDownAction(record)" -->
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
  <TemplateStageModal @register="registerModal" @success="onUserDrawerSuccess" />
  <TemplateDetailList @register="registerDrawer" />
</template>

<script lang="ts" setup>
  import { computed, watch } from 'vue';
  import { ActionItem, BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/src/components/Drawer';
  import { useListPage } from '/@/hooks/system/useListPage';
  import TemplateStageModal from './TemplateStageModal.vue';
  import TemplateDetailList from './TemplateDetailList.vue';
  import { ColEx } from '/@/components/Form/src/types';
  import { stageColumns, itemSearchFormSchema } from '../Template.data';
  import { itemList, deleteItem, deleteBatchItem } from '../Template.api';

  const props = defineProps({
    templateId: { require: true, type: String },
  });

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
      columns: stageColumns,
      canResize: false,
      pagination: {
        pageSize: 50,
      },
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
  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  watch(
    () => props.templateId,
    () => reload()
  );
  //注册Modal
  const [registerModal, { openModal }] = useModal();
  //注册Drawer
  const [registerDrawer, { openDrawer }] = useDrawer();

  // 创建
  function createItem() {
    if (!templateId.value) {
      createMessage.warning('请先选择一个模板');
    } else {
      openModal(true, {
        isUpdate: false,
        templateId: templateId,
      });
    }
  }
  /**
   * 成功回调
   */
  function onUserDrawerSuccess() {
    reload();
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
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }

  /**
   * 操作栏
   */
  function getDropDownAction(record): ActionItem[] {
    return [
      {
        label: '添加明细',
        onClick: handleAddDetail.bind(null, record),
      },
      {
        label: '删除',
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
  /**
   * 编辑事件
   */
  async function handleEdit(record: Recordable) {
    openModal(true, {
      isUpdate: true,
      templateId: templateId,
      record: record,
    });
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteItem({ id: record.id }, reload);
  }
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await deleteBatchItem({ ids: selectedRowKeys.value }, () => {
      selectedRowKeys.value = [];
      reload();
    });
  }
  /**
   * 编辑事件
   */
  async function handleAddDetail(record: Recordable) {
    openDrawer(true, {
      id: record.id,
      templateId: templateId,
    });
  }
</script>
