<template>
  <BasicForm @register="register">
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
  </BasicForm>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form';
  import { ApiSelect } from '/@/components/Form/index';
  import { formSchema } from '../Project.data';
  import { saveOrUpdateProject, getAllCustomerList } from '../Project.api';

  // 声明Emits
  const emit = defineEmits(['register', 'next']);
  const [register, { validate }] = useForm({
    labelWidth: 200,
    schemas: formSchema,
    actionColOptions: {
      span: 14,
    },
    showResetButton: false,
    submitButtonOptions: {
      text: '下一步',
    },
    submitFunc: customSubmitFunc,
  });

  async function customSubmitFunc() {
    try {
      const values = await validate();
      emit('next', values);
    } catch (error) {}
  }
</script>