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
  import { initDictOptions } from '/@/utils/dict';
  import { ApiSelect } from '/@/components/Form/index';
  import dayjs, { Dayjs } from 'dayjs';
  import { getScheduleFormSchema } from './CostLog.data';
  import { saveOrUpdateCost, getAllProject } from './CostLog.api';
  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
  const columns = ref<any[]>([]);

  async function initDictData(): Promise<[]> {
    //根据字典Code, 初始化字典数组
    const dictData = await initDictOptions('project_cost_key');
    return dictData.reduce((prev, next) => {
      if (next) {
        prev.push({
          title: next['text'] || next['label'],
          dataIndex: +next['value'],
        });
      }
      return prev;
    }, []);
  }
  //初始化字典选项
  initDictData().then((res) => {
    columns.value = getScheduleFormSchema(res);
  });

  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: columns,
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
      await setFieldsValue({ staff: userinfo.value.realname, createTime: dayjs() });
    }
  });
  //设置标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增项目费用' : '编辑项目费用'));
  const { adaptiveWidth } = useDrawerAdaptiveWidth();
  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      setDrawerProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdateCost(values);
      //关闭弹窗
      closeDrawer();
      //刷新列表
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
