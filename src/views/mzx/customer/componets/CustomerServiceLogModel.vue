<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" width="600px" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/src/components/Modal';
  import { BasicForm, useForm } from '/src/components/Form';
  import { useUserStore } from '/@/store/modules/user';
  import { serviceLogFormSchema } from '../Customer.data';
  import { saveOrUpdateService } from '../Customer.api';
  // 声明Emits
  const emit = defineEmits(['success', 'register']);
  const props = defineProps({ customerId: String });
  const isUpdate = ref(true);
  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);

  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: serviceLogFormSchema,
    showActionButtonGroup: false,
    mergeDynamicData: props,
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      data.record.editPlan = new Date(data.record.nextPlanTime) > new Date();
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
    } else {
      await setFieldsValue({ workHours: 1 });
    }
    await setFieldsValue({ staff: userinfo.value.realname, customerName: data.customerName });
  });
  //设置标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增客户服务记录' : '编辑客户服务记录'));
  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      values.customerId = props.customerId;
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdateService(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
