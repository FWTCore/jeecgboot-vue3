<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" width="500px" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/src/components/Modal';
  import { BasicForm, useForm } from '/src/components/Form';
  import { detailFormSchema } from '../Template.data';
  import { saveOrUpdateItem } from '../Template.api';
  // 声明Emits
  const emit = defineEmits(['success', 'register']);
  const props = defineProps({ parentId: String, projectScheduleTemplateId: String });
  const isUpdate = ref(true);
  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: detailFormSchema,
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
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
    }
  });
  //设置标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增项目进度阶段明细' : '编辑项目进度阶段明细'));
  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      values.parentId = props.parentId;
      values.projectScheduleTemplateId = props.projectScheduleTemplateId;
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdateItem(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
