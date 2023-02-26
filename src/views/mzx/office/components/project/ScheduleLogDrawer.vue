<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" :width="adaptiveWidth" :title="getTitle" @ok="handleSubmit" destroyOnClose>
    <BasicForm @register="registerForm">
      <template #remoteSearchProject="{ model, field }">
        <ApiSelect
          :api="getAllProject"
          showSearch
          v-model:value="model[field]"
          :filterOption="true"
          optionFilterProp="label"
          resultField="list"
          labelField="projectName"
          valueField="id"
          state="projectName"
          placeholder="请选择项目"
          @change="onChange"
        />
      </template>
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
          :auto="immediate"
          @change="onChangeSchedule"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, watch, toRaw } from 'vue';
  import { BasicForm, useForm } from '/src/components/Form';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useDrawerAdaptiveWidth } from '/@/hooks/jeecg/useAdaptiveWidth';
  import { useUserStore } from '/@/store/modules/user';
  import { ApiSelect } from '/@/components/Form/index';
  import { scheduleFormSchema } from './ScheduleLog.data';
  import { saveOrUpdateSchedule, getAllUsageSchedule, getAllProject } from './ScheduleLog.api';
  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
  const scheduleParams = ref({});
  const immediate = ref(false);

  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: scheduleFormSchema,
    showActionButtonGroup: false,
  });

  //表单赋值
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false, showFooter: true });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
    } else {
      await setFieldsValue({ staff: userinfo.value.realname });
    }
  });
  //设置标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增项目服务日志' : '编辑项目服务日志'));
  const { adaptiveWidth } = useDrawerAdaptiveWidth();
  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      setDrawerProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdateSchedule(values, isUpdate.value);
      //关闭弹窗
      closeDrawer();
      //刷新列表
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  function onChange(data) {
    scheduleParams.value = {
      projectId: toRaw(data)[0].value,
    };
    immediate.value = true;
  }

  function onChangeSchedule(data) {
    console.log(data);
  }
</script>
