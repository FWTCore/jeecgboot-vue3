<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" :title="getTitle" width="70%">
    <BasicTable @register="registerTable" :rowClassName="getRowClassName">
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate"> 新增</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </BasicDrawer>
  <CustomerServiceLogModel @register="registerModal" @success="reload" :customerId="customerId" />
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/src/components/Drawer';
  import { BasicTable, useTable, TableAction } from '/src/components/Table';
  import { useModal } from '/src/components/Modal';
  import { useDesign } from '/@/hooks/web/useDesign';
  import CustomerServiceLogModel from './CustomerServiceLogModel.vue';
  import { serviceLogColumns, serviceLogSearchFormSchema } from '../Customer.data';
  import { serviceList, serviceDelete } from '../Customer.api';
  import { ColEx } from '/@/components/Form/src/types';
import { right } from 'inquirer/lib/utils/readline';

  const { prefixCls } = useDesign('row-invalid');
  const customerId = ref('');
  const customerName = ref('');

  //字典配置model
  const [registerModal, { openModal }] = useModal();
  const [registerDrawer] = useDrawerInner(async (data) => {
    customerId.value = data.record.id;
    customerName.value = data.record.customerName;
    setProps({ searchInfo: { customerId: unref(customerId) } });
    reload();
  });
  //设置标题
  const getTitle = computed(() => unref(customerName) + '--服务记录列表');
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
    api: serviceList,
    columns: serviceLogColumns,
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
      schemas: serviceLogSearchFormSchema,
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
      fixed: 'right',
    },
  });

  /**
   * 新增
   */
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
      customerName: customerName.value,
    });
  }

  /**
   * 删除
   */
  async function handleDelete(record) {
    await serviceDelete({ id: record.id }, reload);
  }
  /**
   * 编辑
   */
  async function handleEdit(record) {
    openModal(true, {
      isUpdate: true,
      record: record,
      customerName: customerName.value,
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
