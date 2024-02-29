<template>
  <!--引用表格-->
  <BasicTable @register="registerTable">
    <!--插槽:table标题-->
    <template #tableTitle>
      <div>截至统计到{{ dayjs().add(-1, 'day').format('YYYY-MM-DD') }}日的数据</div>
    </template>
    <template #projectCost="{ record }">
      <a-button type="link" class="ml-2" @click="handleProjectCost(record)"> {{ record.projectCost }} </a-button>
    </template>
    <template #superLifeline="{ record }">
      <a-button color="success" v-if="record.superLifeline != 1"> 否 </a-button>
      <a-button color="error" v-if="record.superLifeline === 1"> 是 </a-button>
    </template>
  </BasicTable>
  <ProjectCostDetail @register="registerModal" />
</template>

<script lang="ts" name="project-cost-board" setup>
  //ts语法
  import { ref, computed, unref, toRaw } from 'vue';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { BasicTable } from '/src/components/Table';
  import { useModal } from '/@/components/Modal';
  import ProjectCostDetail from './componets/ProjectCostDetail.vue';
  import { columns, searchFormSchema } from './projectCostBoard.data';
  import { list } from './projectCostBoard.api';
  import { Tag } from 'ant-design-vue';
  import dayjs, { Dayjs } from 'dayjs';
  //弹窗model
  const [registerModal, { openModal }] = useModal();

  // 列表页面公共参数、方法
  const { tableContext } = useListPage({
    designScope: 'project-cost-board',
    tableProps: {
      title: '项目成本核算列表',
      api: list,
      size: 'small',
      columns: columns,
      formConfig: {
        schemas: searchFormSchema,
      },
      pagination: {
        pageSize: 50,
      },
      showActionColumn: false,
      showTableSetting: false,
    },
  });

  //注册table数据
  const [registerTable, { reload }] = tableContext;

  /**
   * 项目人力成本明细
   */
  function handleProjectCost(record) {
    openModal(true, {
      record,
      showFooter: false,
    });
  }
</script>
