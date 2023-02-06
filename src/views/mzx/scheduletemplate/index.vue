<template>
  <a-row :class="['p-4', `${prefixCls}--box`]" type="flex" :gutter="10">
    <a-col :xl="12" :lg="24" :md="24" style="margin-bottom: 10px">
      <div style="height: 100%; background-color: white">
        <TemplateList @select="onTemplateSelect" />
      </div>
    </a-col>
    <a-col :xl="12" :lg="24" :md="24" style="margin-bottom: 10px">
      <div style="height: 100%; background-color: white">
        <div v-show="templateId != null">
          <TemplateStageList :templateId="templateId" />
        </div>
        <div v-show="templateId == null" style="padding-top: 80px; height: 100%; background-color: white">
          <a-empty description="尚未选择模板" />
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup name="schedule-template">
  import { ref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import TemplateList from './components/TemplateList.vue';
  import TemplateStageList from './components/TemplateStageList.vue';

  const { prefixCls } = useDesign('schedule-template');

  // 当前选中的模板
  const templateId = ref<any | null>(null);

  // 左侧选择后触发
  function onTemplateSelect(data) {
    templateId.value = data;
  }
</script>
<style lang="less">
  @import './index.less';
</style>
