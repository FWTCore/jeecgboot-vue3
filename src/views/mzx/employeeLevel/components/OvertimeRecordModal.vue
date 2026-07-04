<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="modalTitle"
    :width="1300"
    :showOkBtn="false"
    destroyOnClose
  >
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    overtimeModalColumns,
    overtimeModalColumnsWithAction,
    overtimeModalSearchFormSchema,
  } from '../EmployeeLeave.data';
  import { getOvertimeList, confirmOvertime } from '../EmployeeLeave.api';

  const emit = defineEmits(['register', 'success']);

  // 弹窗参数
  const staffId = ref('');
  const confirmStatus = ref<string | null>(null);
  const staffName = ref('');

  // 是否显示确认操作列
  const showConfirmAction = computed(() => unref(confirmStatus) === '0');

  // 弹窗标题
  const modalTitle = computed(() => {
    const name = unref(staffName) || '员工';
    if (unref(confirmStatus) === '0') {
      return `${name} - 待确认加班记录`;
    } else if (unref(confirmStatus) === '1') {
      return `${name} - 已确认加班记录`;
    }
    return `${name} - 加班记录`;
  });

  // 动态列配置
  const tableColumns = computed(() => {
    if (unref(showConfirmAction)) {
      return overtimeModalColumnsWithAction;
    }
    return overtimeModalColumns;
  });

  // 注册弹窗
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ loading: true });
    staffId.value = data.staffId || '';
    staffName.value = data.staffName || '';
    confirmStatus.value = data.confirmStatus || null;

    // 根据 confirmStatus 设置列
    if (data.confirmStatus === '0') {
      setColumns(overtimeModalColumnsWithAction);
    } else {
      setColumns(overtimeModalColumns);
    }

    // 重新加载表格数据
    await reload();
    setModalProps({ loading: false });
  });

  // 注册表格
  const [registerTable, { reload, setColumns }] = useTable({
    api: getOvertimeList,
    columns: overtimeModalColumns,
    size: 'small',
    pagination: { pageSize: 10 },
    showTableSetting: false,
    useSearchForm: true,
    formConfig: {
      labelWidth: 80,
      schemas: overtimeModalSearchFormSchema,
      showActionButtonGroup: true,
      showResetButton: true,
      fieldMapToTime: [['overtimeDate', ['overtimeDateBegin', 'overtimeDateEnd'], 'YYYY-MM-DD']],
    },
    beforeFetch: (params) => {
      params.staffId = unref(staffId);
      if (unref(confirmStatus) !== null) {
        params.confirmStatus = unref(confirmStatus);
      }
      return params;
    },
  });

  // 监听 confirmStatus 变化，动态设置列
  watch(confirmStatus, (val) => {
    if (val === '0') {
      setColumns(overtimeModalColumnsWithAction);
    } else {
      setColumns(overtimeModalColumns);
    }
  });

  /**
   * 获取操作列按钮
   */
  function getTableAction(record) {
    if (!unref(showConfirmAction)) {
      return [];
    }
    return [
      {
        label: '确认',
        popConfirm: {
          title: '确定确认该加班记录吗?',
          confirm: handleConfirm.bind(null, record),
        },
      },
    ];
  }

  /**
   * 确认加班记录
   */
  async function handleConfirm(record) {
    await confirmOvertime({ id: record.id });
    // 刷新弹窗列表
    await reload();
    // 触发父组件刷新主列表
    emit('success');
  }
</script>