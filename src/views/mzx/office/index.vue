<template>
  <div class="p-4">
    <a-card :bordered="false" style="height: 100%">
      <a-tabs v-model:activeKey="activeKey" @change="tabChange">
        <a-tab-pane key="ServiceLogList" tab="客户服务日志" />
        <a-tab-pane key="ScheduleLogList" tab="项目服务日志" />
        <a-tab-pane key="CostLogList" tab="项目费用" />
        <a-tab-pane key="WorkLogList" tab="日常服务日志" />
      </a-tabs>
      <component :is="currentComponent" />
    </a-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import WorkLogList from './components/work/WorkLogList.vue';
  import ServiceLogList from './components/customer/ServiceLogList.vue';
  import ScheduleLogList from './components/project/ScheduleLogList.vue';
  import CostLogList from './components/project/CostLogList.vue';

  const activeKey = ref('ServiceLogList');
  const currentComponent = computed(() => {
    const componentType = {
      WorkLogList: WorkLogList,
      ServiceLogList: ServiceLogList,
      ScheduleLogList: ScheduleLogList,
      CostLogList: CostLogList,
    };
    return componentType[activeKey.value];
  });

  //使用component动态切换tab
  function tabChange(key) {
    activeKey.value = key;
  }
</script>
