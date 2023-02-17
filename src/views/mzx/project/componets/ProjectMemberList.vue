<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" width="500px" @ok="handleSubmit">
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> 新增</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined" />
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>
            批量操作
            <Icon icon="ant-design:down-outlined" />
          </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/src/components/Modal';
  import { BasicForm, useForm } from '/src/components/Form';
  import { formSchema } from '../Project.data';
  import { saveOrUpdateDict } from '../Project.api';
  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const rowId = ref('');
  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false, minHeight: 80 });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
    }
  });
  //设置标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增客户' : '编辑客户'));
  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdateDict(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
