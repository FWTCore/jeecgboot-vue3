<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" title="成员列表" width="800px">
    <BasicTable @register="registerTable" :rowClassName="getRowClassName">
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate"> 新增</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </BasicDrawer>
  <ProjectMemberModel @register="registerModal" @success="reload" :projectId="projectId" />
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/src/components/Drawer';
  import { BasicTable, useTable, TableAction } from '/src/components/Table';
  import { useModal } from '/src/components/Modal';
  import { useDesign } from '/@/hooks/web/useDesign';
  import ProjectMemberModel from './ProjectMemberModel.vue';
  import { memberColumns, searchMemberFormSchema } from '../Project.data';
  import { memberList, deleteMember } from '../Project.api';
  import { ColEx } from '/@/components/Form/src/types';

  const { prefixCls } = useDesign('row-invalid');
  const projectId = ref('');
  //字典配置model
  const [registerModal, { openModal }] = useModal();
  const [registerDrawer] = useDrawerInner(async (data) => {
    projectId.value = data.record.id;
    setProps({ searchInfo: { projectId: unref(projectId) } });
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
    api: memberList,
    columns: memberColumns,
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
      schemas: searchMemberFormSchema,
      autoSubmitOnEnter: true,
    },
    striped: true,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    immediate: false,
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
   * 删除
   */
  async function handleDelete(record) {
    await deleteMember({ id: record.id }, reload);
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
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
