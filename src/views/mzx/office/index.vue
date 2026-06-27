<template>
  <div class="p-4">
    <a-card :bordered="false" style="height: 100%">
      <a-tabs v-model:activeKey="activeKey" @change="tabChange">
        <a-tab-pane key="ScheduleLogList" tab="项目服务日志" />
        <a-tab-pane key="ServiceLogList" tab="客户服务日志" />
        <a-tab-pane key="CostLogList" tab="项目费用" />
        <a-tab-pane key="WorkLogList" tab="日常服务日志" />
        <a-tab-pane key="OvertimeRecordList" tab="我的加班" />
      </a-tabs>
      <component :is="currentComponent" @switchTab="handleSwitchTab" />
    </a-card>
  </div>
</template>
<script lang="ts" setup name="mzx-office-workspaces">
  import { ref, computed } from 'vue';
  import WorkLogList from './components/work/WorkLogList.vue';
  import ServiceLogList from './components/customer/ServiceLogList.vue';
  import ScheduleLogList from './components/project/ScheduleLogList.vue';
  import CostLogList from './components/project/CostLogList.vue';
  import OvertimeRecordList from './components/overtime/OvertimeRecordList.vue';

  const activeKey = ref('ScheduleLogList');
  const currentComponent = computed(() => {
    const componentType = {
      WorkLogList: WorkLogList,
      ServiceLogList: ServiceLogList,
      ScheduleLogList: ScheduleLogList,
      CostLogList: CostLogList,
      OvertimeRecordList: OvertimeRecordList,
    };
    return componentType[activeKey.value];
  });

  //使用component动态切换tab
  function tabChange(key) {
    activeKey.value = key;
  }

  // 切换到指定tab（由子组件触发）
  function handleSwitchTab(key: string) {
    activeKey.value = key;
  }
</script>
