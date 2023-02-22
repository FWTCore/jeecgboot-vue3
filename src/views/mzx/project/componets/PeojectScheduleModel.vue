<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" width="700px" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #remoteSearchSchedule="{ model, field }">
        <ApiSelect
          :api="getAllUsageSchedule"
          :params="scheduleParams"
          showSearch
          v-model:value="model[field]"
          optionFilterProp="label"
          resultField="list"
          labelField="scheduleName"
          valueField="id"
          state="scheduleName"
          placeholder="请选择项目进度"
          :immediate="false"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/src/components/Modal';
  import { BasicForm, useForm } from '/src/components/Form';
  import { ApiSelect } from '/@/components/Form/index';
  import { scheduleFormSchema } from '../Project.data';
  import { saveOrUpdateSchedule, getAllUsageSchedule } from '../Project.api';
  // 声明Emits
  const emit = defineEmits(['success', 'register']);
  const props = defineProps({ projectId: String, projectName: String });
  const isUpdate = ref(true);
  const scheduleParams = ref({});
  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: scheduleFormSchema,
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
    scheduleParams.value = {
      projectId: props.projectId,
    };
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      console.log(data.record);
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
    }
    await setFieldsValue({ projectName: props.projectName });
  });
  //设置标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增服务记录' : '编辑服务记录'));
  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      values.projectId = props.projectId;
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdateSchedule(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  function onChange(e){
    console.log('selected:', e);
  }
  
  function onOptionsChange(options){
  console.log('get options', options.length, options);
  }
</script>
