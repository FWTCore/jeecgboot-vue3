<template>
  <div class="p-4">
    <a-card :bordered="false" style="height: 100%">
      <a-tabs v-model:activeKey="activeKey" @change="tabChange">
        <a-tab-pane key="serviceList" tab="客户服务日志" />
        <a-tab-pane key="ScheduleList" tab="项目服务日志" />
        <a-tab-pane key="WorkLogList" tab="日常日志" />
      </a-tabs>
      <component :is="currentComponent" />
    </a-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import WorkLogList from './components/work/WorkLogList.vue';
  import serviceList from './components/customer/serviceList.vue';
  import ScheduleList from './components/project/ScheduleList.vue';

  const activeKey = ref('serviceList');
  const currentComponent = computed(() => {
    const componentType = {
      WorkLogList: WorkLogList,
      serviceList: serviceList,
      ScheduleList: ScheduleList,
    };
    return componentType[activeKey.value];
  });

  //使用component动态切换tab
  function tabChange(key) {
    activeKey.value = key;
  }
</script>
