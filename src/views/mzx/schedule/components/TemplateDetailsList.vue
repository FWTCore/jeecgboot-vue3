<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" width="1000px" @ok="handleSubmit">
    <BasicTable @register="registerTable" :rowSelection="rowSelection" style="padding: 0px" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, toRaw } from 'vue';
  import { BasicModal, useModalInner } from '/src/components/Modal';
  import { BasicTable, useTable, TableAction } from '/src/components/Table';
  import { itemColumns, itemSearchFormSchema } from '../Template.data';
  import { itemList, deleteItem, deleteBatchItem } from '../Template.api';
  // 声明Emits
  const emit = defineEmits(['select', 'register']);
  const checkedKeys = ref<Array<string | number>>([]);
  const props = defineProps({ projectScheduleTemplateId: String });
  const templateId = ref('');
  const titleName = ref('');

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    templateId.value = data.id;
    titleName.value = data.titleName;
    setProps({ searchInfo: { projectScheduleTemplateId: unref(templateId) } });
    reload();
  });
  //注册table数据
  const [registerTable, { reload, setProps }] = useTable({
    api: itemList,
    rowKey: 'id',
    columns: itemColumns,
    formConfig: {
      labelWidth: 60,
      schemas: itemSearchFormSchema,
      baseRowStyle: { maxHeight: '20px' },
      autoSubmitOnEnter: true,
    },
    striped: true,
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
  });
  /**
   * 选择列配置
   */
  const rowSelection = {
    type: 'checkbox',
    columnWidth: 50,
    selectedRowKeys: checkedKeys,
    onChange: onSelectChange,
  };
  /**
   * 选择事件
   */
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    checkedKeys.value = selectedRowKeys;
  }

  //提交事件
  function handleSubmit() {
    setModalProps({ confirmLoading: true });
    //关闭弹窗
    closeModal();
    //刷新列表
    emit('select', toRaw(unref(checkedKeys)));
    setModalProps({ confirmLoading: false });
  }

  //设置标题
  const getTitle = computed(() => (unref(titleName)+'--明细列表'));
</script>
