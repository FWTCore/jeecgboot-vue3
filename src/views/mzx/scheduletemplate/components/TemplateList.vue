<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" :rowSelection="rowSelection" @row-click="clickRowData">
    <!--插槽:table标题-->
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> 新增</a-button>
      <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
      <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="batchHandleDelete">
              <Icon icon="ant-design:delete-outlined"></Icon>
              删除
            </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          批量操作
          <Icon icon="ant-design:down-outlined"></Icon>
        </a-button>
      </a-dropdown>
    </template>
    <!--操作栏-->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
  <TemplateModal @register="registerModal" @success="handleSuccess" />
</template>

<script lang="ts" setup>
  //ts语法
  import { provide } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { BasicTable, TableAction } from '/src/components/Table';
  import { useModal } from '/src/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import TemplateModal from './TemplateModal.vue';
  import { columns, searchFormSchema } from '../Template.data';
  import { list, deleteData, batchDeleteData, getExportUrl, getImportUrl } from '../Template.api';

  const emit = defineEmits(['select']);

  const { prefixCls } = useDesign('schedule-template-stage');
  provide('prefixCls', prefixCls);

  //model
  const [registerModal, { openModal }] = useModal();

  // 列表页面公共参数、方法
  const { tableContext, onExportXls, onImportXls, doRequest } = useListPage({
    designScope: 'schedule-template',
    tableProps: {
      title: '项目进度模板',
      api: list,
      pagination: {
        pageSize: 50,
      },
      showTableSetting: false,
      columns: columns,
      formConfig: {
        schemas: searchFormSchema,
      },
      actionColumn: {
        width: 240,
      },
    },
    exportConfig: {
      name: '项目进度模板列表',
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
    },
  });
  //注册table数据
  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;
  /**
   * 新增事件
   */
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
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
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteData({ id: record.id }, reload);
    setItemData(null);
  }
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDeleteData({ ids: selectedRowKeys.value }, () => {
      selectedRowKeys.value = [];
      reload();
      setItemData(null);
    });
  }
  /**
   * 成功回调
   */
  function handleSuccess() {
    reload();
    setItemData(null);
  }
  /**
   * 选择事件
   */
  function clickRowData(record, index) {
    if (index != null) {
      setItemData(record);
    }
  }
  /**
   * 设置条目模板
   */
  function setItemData(record) {
    if (record === null) {
      emit('select', null);
    } else {
      emit('select', record.id);
    }
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
        label: '删除',
        popConfirm: {
          title: '确定删除吗?',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
</script>
