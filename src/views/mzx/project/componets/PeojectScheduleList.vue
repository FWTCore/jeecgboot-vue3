<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" :title="getTitle" width="80%">
    <BasicTable @register="registerTable" :rowClassName="getRowClassName">
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate"> 新增</a-button>
        <a-button type="primary" @click="handleRemedy"> 补录</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </BasicDrawer>
  <PeojectScheduleModel @register="registerModal" @success="reload" :projectId="projectId" :projectName="projectName" />
</template>
<script lang="ts" setup>
  import { ref, unref, computed } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/src/components/Drawer';
  import { BasicTable, useTable, TableAction, ActionItem } from '/src/components/Table';
  import { useModal } from '/src/components/Modal';
  import { useDesign } from '/@/hooks/web/useDesign';
  import PeojectScheduleModel from './PeojectScheduleModel.vue';
  import { scheduleColumns, searchScheduleFormSchema } from '../Project.data';
  import { listSchedule, deleteSchedule } from '../Project.api';
  import { ColEx } from '/@/components/Form/src/types';

  const { prefixCls } = useDesign('row-invalid');
  const projectId = ref('');
  const projectName = ref('');

  //字典配置model
  const [registerModal, { openModal }] = useModal();

  const [registerDrawer] = useDrawerInner(async (data) => {
    projectId.value = data.record.id;
    projectName.value = data.record.projectName;
    setProps({ searchInfo: { projectId: unref(projectId) } });
    reload();
  });

  //设置标题
  const getTitle = computed(() => unref(projectName) + '--服务记录列表');

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
    api: listSchedule,
    columns: scheduleColumns,
    pagination: {
      pageSize: 50,
    },
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
      schemas: searchScheduleFormSchema,
      autoSubmitOnEnter: true,
    },
    striped: true,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    immediate: false,
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: 'right',
    },
  });

  /**
   * 新增
   */
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
      remedy: false,
    });
  }

  /**
   * 补录
   */
  function handleRemedy() {
    openModal(true, {
      isUpdate: false,
      remedy: true,
    });
  }
  /**
   * 编辑
   */
  function handleEdit(record) {
    openModal(true, {
      isUpdate: true,
      record,
    });
  }
  /**
   * 删除
   */
  async function handleDelete(record) {
    await deleteSchedule({ id: record.id }, reload);
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
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
  function getRowClassName(record) {
    return record.status == 0 ? prefixCls : '';
  }
</script>
<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-row-invalid';

  :deep(.@{prefix-cls}) {
    background: #f4f4f4;
    color: #bababa;
  }
</style>
