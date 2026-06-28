<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    :showOkBtn="false"
    width="1400px"
    destroyOnClose
  >
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <div>该项目所有加班记录</div>
      </template>
    </BasicTable>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/src/components/Modal';
  import { BasicTable, useTable } from '/src/components/Table';
  import { overtimeList } from '/@/views/mzx/office/components/overtime/OvertimeRecord.api';
  import { overtimeColumns } from '/@/views/mzx/office/components/overtime/OvertimeRecord.data';

  const projectName = ref('');

  const [registerModal] = useModalInner(async (data) => {
    projectName.value = data.projectName;
    // 设置查询参数，按项目ID过滤，只查询已确认的加班记录
    setProps({
      searchInfo: {
        projectId: data.projectId,
        confirmStatus: 1, // 1表示已确认
      },
    });
    reload();
  });

  const getTitle = computed(() => unref(projectName) + ' -- 加班记录');

  const [registerTable, { reload, setProps }] = useTable({
    api: overtimeList,
    columns: overtimeColumns,
    striped: true,
    useSearchForm: false,
    showTableSetting: false,
    clickToRowSelect: false,
    bordered: true,
    showIndexColumn: true,
    tableSetting: { fullScreen: true },
    canResize: false,
    pagination: {
      pageSize: 20,
    },
    immediate: false,
    showActionColumn: false,
  });
</script>