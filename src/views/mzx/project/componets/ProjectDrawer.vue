<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" showFooter :width="adaptiveWidth" :title="getTitle" @ok="handleSubmit" destroyOnClose>
    <BasicForm @register="registerForm">
      <template #remoteSearchCustomer="{ model, field }">
        <ApiSelect
          :api="getAllCustomerList"
          showSearch
          v-model:value="model[field]"
          :filterOption="true"
          optionFilterProp="label"
          resultField="list"
          labelField="customerName"
          valueField="id"
          state="customerName"
          placeholder="请选择客户"
        />
      </template>
      <template #remoteSearchScheduleTemplate="{ model, field }">
        <ApiSelect
          :api="getAllScheduleTemplateList"
          showSearch
          v-model:value="model[field]"
          optionFilterProp="label"
          resultField="list"
          labelField="scheduleTemplateName"
          valueField="id"
          state="scheduleTemplateName"
          placeholder="请选择项目进度模板"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/src/components/Form';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useDrawerAdaptiveWidth } from '/@/hooks/jeecg/useAdaptiveWidth';
  import { ApiSelect } from '/@/components/Form/index';
  import { formSchema } from '../Project.data';
  import { saveOrUpdateProject, getScheduleTemplate, getAllScheduleTemplateList, getAllCustomerList } from '../Project.api';
  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const rowId = ref('');
  const showFooter = ref(true);
  //表单配置
  const [registerForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  //表单赋值
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    showFooter.value = data?.showFooter ?? true;
    setDrawerProps({ confirmLoading: false, showFooter: showFooter.value });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      try {
        const template = await getScheduleTemplate({ projectId: data.record.id });
        if (template) {
          data.record.projectScheduleTemplateId = template.projectScheduleTemplateId;
          data.record.scheduleTemplateName = template.scheduleTemplateName;
        }
      } catch (error) {}
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
      setTimeout(() => {}, 1000 * 2);
      data.record.projectScheduleTemplateId && (await setFieldsValue({ projectScheduleTemplateId: data.record.projectScheduleTemplateId }));
      setProps({ disabled: !showFooter.value });
    }
  });
  //设置标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增项目' : '编辑项目'));
  const { adaptiveWidth } = useDrawerAdaptiveWidth();
  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      setDrawerProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdateProject(values, isUpdate.value);
      //关闭弹窗
      closeDrawer();
      //刷新列表
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
