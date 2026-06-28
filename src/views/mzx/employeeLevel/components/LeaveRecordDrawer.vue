<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :width="adaptiveWidth"
    :title="getTitle"
    @ok="handleSubmit"
    destroyOnClose
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>

<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/src/components/Form';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useDrawerAdaptiveWidth } from '/@/hooks/jeecg/useAdaptiveWidth';
  import { leaveRecordFormSchema } from '../EmployeeLeave.data';
  import { addLeaveRecord, getStatisticsList } from '../EmployeeLeave.api';
  import { useMessage } from '/@/hooks/web/useMessage';

  const emit = defineEmits(['register', 'success']);
  const { createMessage } = useMessage();

  // 员工调休统计信息
  const employeeStats = ref({
    confirmedOvertimeHours: 0,
    usedLeaveHours: 0,
  });

  // 表单配置 - 员工名称字段直接显示文本
  const modifiedFormSchema = leaveRecordFormSchema.map((item) => {
    if (item.field === 'staffName') {
      return {
        ...item,
        component: 'Input',
        dynamicDisabled: true,
      };
    }
    if (item.field === 'staffId') {
      return {
        ...item,
        show: false,
      };
    }
    return item;
  });

  // 表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: modifiedFormSchema,
    showActionButtonGroup: false,
  });

  // 动态标题
  const getTitle = computed(() => '录入调休');
  const { adaptiveWidth } = useDrawerAdaptiveWidth();

  // 抽屉初始化
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false, showFooter: true });

    // 重置统计信息
    employeeStats.value = {
      confirmedOvertimeHours: 0,
      usedLeaveHours: 0,
    };

    // 设置员工信息
    if (data.staffId && data.staffName) {
      await setFieldsValue({
        staffId: data.staffId,
        staffName: data.staffName,
      });
      // 获取员工调休统计信息
      await loadEmployeeStats(data.staffId);
    }
  });

  /**
   * 加载员工调休统计信息
   */
  async function loadEmployeeStats(staffId: string) {
    try {
      // 通过统计列表接口获取单个员工的统计信息
      const result = await getStatisticsList({ employeeId: staffId, pageNo: 1, pageSize: 1 });
      if (result && result.records && result.records.length > 0) {
        const stats = result.records[0];
        employeeStats.value = {
          confirmedOvertimeHours: stats.confirmedOvertimeHours || 0,
          usedLeaveHours: stats.usedLeaveHours || 0,
        };
        const remaining = (stats.confirmedOvertimeHours || 0) - (stats.usedLeaveHours || 0);
        await setFieldsValue({
          remainingHoursDisplay: `${remaining.toFixed(1)} 小时`,
        });
      }
    } catch (e) {
      console.error('获取员工调休统计失败', e);
    }
  }

  /**
   * 提交表单
   */
  async function handleSubmit() {
    try {
      const values = await validate();

      // 校验是否选择了员工
      if (!values.staffId) {
        createMessage.warning('请选择员工');
        return;
      }

      // 校验调休时长不超过剩余调休
      const remaining = employeeStats.value.confirmedOvertimeHours - employeeStats.value.usedLeaveHours;
      if (values.leaveHours > remaining) {
        createMessage.warning(`调休时长不能超过剩余调休 ${remaining.toFixed(1)} 小时`);
        return;
      }

      setDrawerProps({ confirmLoading: true });

      // 提交数据
      await addLeaveRecord({
        staffId: values.staffId,
        staffName: values.staffName,
        leaveDate: values.leaveDate,
        leaveHours: values.leaveHours,
        leaveReason: values.leaveReason,
      });

      createMessage.success('录入成功');
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>