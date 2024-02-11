<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" :width="adaptiveWidth" :title="getTitle" @ok="handleSubmit" destroyOnClose>
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, watch, toRaw } from 'vue';
  import { BasicForm, useForm } from '/src/components/Form';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useDrawerAdaptiveWidth } from '/@/hooks/jeecg/useAdaptiveWidth';
  import { useUserStore } from '/@/store/modules/user';
  import dayjs, { Dayjs } from 'dayjs';
  import { formSchema } from '../EmployeePayroll.data';
  import { saveOrUpdate } from '../EmployeePayroll.api';
  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const isRemedy = ref(false);
  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);

  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  //表单赋值
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false, showFooter: true });
    isUpdate.value = !!data?.isUpdate;
    await setFieldsValue({ periodDate: dayjs().format('YYYY-MM') });
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        remedy: unref(isRemedy),
        ...data.record,
      });
    }
  });
  //设置标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增员工工资' : '编辑员工工资'));
  const { adaptiveWidth } = useDrawerAdaptiveWidth();
  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      setDrawerProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdate(values, isUpdate.value);
      //关闭弹窗
      closeDrawer();
      //刷新列表
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
