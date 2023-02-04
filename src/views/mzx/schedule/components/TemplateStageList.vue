<template>
  <a-card :bordered="false">
    <BasicDrawer @register="registerDrawer" :title="getTitle" width="1000px" destroyOnClose>
      <BasicTable @register="registerTable" :rowClassName="getRowClassName" :rowSelection="rowSelection">
        <template #tableTitle>
          <a-button type="primary" @click="handleCreate">新增</a-button>
          <a-dropdown v-if="checkedKeys.length > 0">
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
        <template #expandedRowRender>
          <BasicTable bordered size="middle" rowKey="id" :canResize="false" :columns="innerColumns" :dataSource="innerData" :pagination="false">
          </BasicTable>
        </template>
        <!--操作栏-->
        <template #action="{ record }">
          <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
        </template>
      </BasicTable>
      <JVxeTableModal @register="registerModal" @success="reload()"></JVxeTableModal>
    </BasicDrawer>
  </a-card>
  <TemplateItemModal @register="registerModal" @success="reload" :projectScheduleTemplateId="templateId" />
  <!-- <TemplateDetailsList @register="registerDetailModal" :projectScheduleTemplateId="templateId" /> -->
</template>
<script lang="ts" setup>
  import { ref, unref, computed } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/src/components/Drawer';
  import { BasicTable, useTable, TableAction } from '/src/components/Table';
  import { useModal } from '/src/components/Modal';
  import { useDesign } from '/@/hooks/web/useDesign';
  import TemplateItemModal from './TemplateItemModal.vue';
  import TemplateDetailsList from './TemplateDetailsList.vue';
  import JVxeTableModal from '/@/views/demo/vextable/jvxetable/JVxeTableModal.vue';
  import { itemColumns, itemSearchFormSchema } from '../Template.data';
  import { itemList, deleteItem, deleteBatchItem } from '../Template.api';
  import { ColEx } from '/@/components/Form/src/types';

  const { prefixCls } = useDesign('row-invalid');
  const templateId = ref('');
  const templateName = ref('');
  const checkedKeys = ref<Array<string | number>>([]);
  //配置model
  const [registerModal, { openModal }] = useModal();
  const [registerDetailModal, { openDetailModal }] = useModal();
  const [registerDrawer] = useDrawerInner(async (data) => {
    templateId.value = data.id;
    templateName.value = data.scheduleTemplateName;
    setProps({ searchInfo: { projectScheduleTemplateId: unref(templateId) } });
    reload();
  });
  // 自适应列配置
  const adaptiveColProps: Partial<ColEx> = {
    xs: 24, // <576px
    sm: 24, // ≥576px
    md: 24, // ≥768px
    lg: 12, // ≥992px
    xl: 12, // ≥1200px
    xxl: 8, // ≥1600px
  };
  const [registerTable, { reload, setProps }] = useTable({
    api: itemList,
    columns: itemColumns,
    formConfig: {
      baseColProps: adaptiveColProps,
      labelAlign: 'right',
      labelCol: {
        offset: 1,
        xs: 24,
        sm: 24,
        md: 24,
        lg: 9,
        xl: 7,
        xxl: 4,
      },
      wrapperCol: {},
      schemas: itemSearchFormSchema,
      autoSubmitOnEnter: true,
    },
    striped: true,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    immediate: false,
    rowKey: 'id',
    actionColumn: {
      width: 100,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  /**
   * 新增
   */
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  /**
   * 明细
   */
  function handleDetail(record) {
    openDetailModal(true, {
      id: record.id,
      titleName: unref(templateName) + '--' + record.itemName,
    });
  }

  /**
   * 删除
   */
  async function handleDelete(record) {
    await deleteItem({ id: record.id }, reload);
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '明细配置',
        onClick: handleDetail.bind(null, record),
      },
    ];
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }

  function getRowClassName(record) {
    return record.status == 0 ? prefixCls : '';
  }

  //设置标题
  const getTitle = computed(() => (unref(templateName)+'--阶段列表'));
  /**
   * 选择列配置
   */
  const rowSelection = {
    type: 'checkbox',
    columnWidth: 50,
    selectedRowKeys: checkedKeys,
    onChange: onSelectChange,
  };
  /**
   * 选择事件
   */
  function onSelectChange(selectedRowKeys: (string | number)[], selectionRows) {
    checkedKeys.value = selectedRowKeys;
  }
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await deleteBatchItem({ ids: checkedKeys.value.join(',') }, reload);
  }
</script>
<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-row-invalid';

  :deep(.@{prefix-cls}) {
    background: #f4f4f4;
    color: #bababa;
  }
</style>
