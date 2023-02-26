<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" :width="adaptiveWidth" title="详情">
    <Description @register="registerDesc" />
  </BasicDrawer>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Description, useDescription } from '/@/components/Description/index';
  import { useDrawerAdaptiveWidth } from '/@/hooks/jeecg/useAdaptiveWidth';
  import { initDictOptions } from '/@/utils/dict';
  import { DescItem } from '/@/components/Description';
  import { getScheduleDescItems } from './CostLog.data';

  const detailData = ref([]);
  const columns = ref<DescItem[]>([]);

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
    columns.value = getScheduleDescItems(res);
  });

  //表单赋值
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false, showFooter: false });
    detailData.value = data.record;
  });
  const { adaptiveWidth } = useDrawerAdaptiveWidth();

  const [registerDesc] = useDescription({
    data: detailData,
    schema: columns,
    column: 1,
    labelStyle: {
      width: '180px',
    },
  });
</script>
