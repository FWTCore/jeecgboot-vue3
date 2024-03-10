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
  import { detailSchema } from '../OwnPayroll.data';

  const detailData = ref([]);

  //表单赋值
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false, showFooter: false });
    detailData.value = data.record;
  });
  const { adaptiveWidth } = useDrawerAdaptiveWidth();

  const [registerDesc] = useDescription({
    data: detailData,
    schema: detailSchema,
    column: 1,
    labelStyle: {
      width: '180px',
    },
  });
</script>
