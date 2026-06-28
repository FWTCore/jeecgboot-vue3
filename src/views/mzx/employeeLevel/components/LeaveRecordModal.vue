<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="modalTitle"
    :width="1000"
    :showOkBtn="false"
    destroyOnClose
  >
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { leaveRecordModalColumns } from '../EmployeeLeave.data';
  import { getLeaveRecordList } from '../EmployeeLeave.api';

  const emit = defineEmits(['register']);

  // 弹窗参数
  const staffId = ref('');
  const staffName = ref('');

  // 弹窗标题
  const modalTitle = computed(() => {
    const name = unref(staffName) || '员工';
    return `${name} - 调休使用记录`;
  });

  // 注册弹窗
  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ loading: true });
    staffId.value = data.staffId || '';
    staffName.value = data.staffName || '';

    // 重新加载表格数据
    await reload();
    setModalProps({ loading: false });
  });

  // 注册表格
  const [registerTable, { reload }] = useTable({
    api: getLeaveRecordList,
    columns: leaveRecordModalColumns,
    size: 'small',
    pagination: { pageSize: 10 },
    showTableSetting: false,
    useSearchForm: false,
    beforeFetch: (params) => {
      params.staffId = unref(staffId);
      return params;
    },
  });
</script>