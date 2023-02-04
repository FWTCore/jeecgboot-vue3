<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" :rowSelection="rowSelection">
    <!--插槽:table标题-->
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> 新增</a-button>
      <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
      <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
      <!-- <a-button type="primary" @click="openRecycleModal(true)" preIcon="ant-design:hdd-outlined"> 回收站</a-button> -->

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
  <TemplateModal @register="registerDrawer" @success="handleSuccess" />
  <TemplateStageList @register="registerModal" />
</template>

<script lang="ts" name="system-dict" setup>
  //ts语法
  import { ref, computed, unref } from 'vue';
  import { BasicTable, TableAction } from '/src/components/Table';
  import { useDrawer } from '/src/components/Drawer';
  import { useModal } from '/src/components/Modal';
  import TemplateStageList from './components/TemplateStageList.vue';
  import TemplateModal from './components/TemplateModal.vue';
  import { useMessage } from '/src/hooks/web/useMessage';
  import { columns, searchFormSchema } from './Template.data';
  import { list, deleteData, batchDeleteData, getExportUrl, getImportUrl, refreshCache, queryAllDictItems } from './Template.api';
  import { useListPage } from '/@/hooks/system/useListPage';
  
  const { createMessage } = useMessage();
  //model
  const [registerModal, { openModal }] = useModal();
  //drawer
  const [registerDrawer, { openDrawer }] = useDrawer();


  // 列表页面公共参数、方法
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    designScope: 'dict-template',
    tableProps: {
      title: '项目进度模板',
      api: list,
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
  const [registerTable, { reload, updateTableDataRecord }, { rowSelection, selectedRowKeys }] = tableContext;

  /**
   * 新增事件
   */
  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }
  /**
   * 编辑事件
   */
  async function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
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
    await batchDeleteData({ ids: selectedRowKeys.value }, reload);
  }
  /**
   * 成功回调
   */
  function handleSuccess({ isUpdate, values }) {
    if (isUpdate) {
      updateTableDataRecord(values.id, values);
    } else {
      reload();
    }
  }

  /**
   * 阶段配置
   */
  function handleStage(record) {
    openModal(true, {
      id: record.id,
      scheduleTemplateName: record.scheduleTemplateName,
    });
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
        label: '阶段配置',
        onClick: handleStage.bind(null, record),
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
