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
          :api="queryProjectSchedule"
          :params="scheduleParams"
          showSearch
          v-model:value="model[field]"
          :filterOption="true"
          optionFilterProp="label"
          resultField="list"
          labelField="scheduleName"
          valueField="id"
          state="scheduleName"
          placeholder="请选择项目进度"
          :auto="immediate"
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
  import { overtimeFormSchema } from './OvertimeRecord.data';
  import { saveOrUpdateOvertime, queryProjectSchedule, getAllProject } from './OvertimeRecord.api';

  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
  const scheduleParams = ref({});
  const immediate = ref(false);

  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: overtimeFormSchema,
    showActionButtonGroup: false,
  });

  //表单赋值
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false, showFooter: true });
    isUpdate.value = !!data?.isUpdate;
    immediate.value = false;
    scheduleParams.value = {};

    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
      // 如果有项目ID，设置进度查询参数
      if (data.record.projectId) {
        scheduleParams.value = {
          projectId: toRaw(data.record.projectId),
        };
        immediate.value = true;
      }
    } else {
      // 新增模式
      const defaultValues = { staffName: userinfo.value.realname };

      // 如果传入了 record，进行预填充（从项目服务日志带入）
      if (data.record) {
        await setFieldsValue({
          ...defaultValues,
          ...data.record,
        });
        if (data.record.projectId) {
          scheduleParams.value = {
            projectId: toRaw(data.record.projectId),
          };
          immediate.value = true;
        }
      } else {
        await setFieldsValue(defaultValues);
      }
    }
  });

  //设置标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增加班记录' : '编辑加班记录'));
  const { adaptiveWidth } = useDrawerAdaptiveWidth();

  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      setDrawerProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdateOvertime(values, isUpdate.value);
      //关闭弹窗
      closeDrawer();
      //刷新列表
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  function onChange(data) {
    if (typeof data === 'string') {
      scheduleParams.value = {
        projectId: toRaw(data),
      };
      immediate.value = true;
    }
  }
</script>