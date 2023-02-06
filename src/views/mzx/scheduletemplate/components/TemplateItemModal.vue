<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit" width="70%">
    <a-form ref="formRef" :model="itemScheduleData" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="validatorRules">
      <CollapseContainer title="阶段信息">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8">
            <a-form-item label="阶段名称" name="itemName">
              <a-input v-model:value="itemScheduleData.itemName" placeholder="请输入阶段名称" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item label="可选值" name="defaultText">
              <a-input v-model:value="itemScheduleData.defaultText" placeholder="请输入可选值" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item label="排序" name="sortOrder">
              <a-input-number v-model:value="itemScheduleData.sortOrder" placeholder="请输入排序" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8">
            <a-form-item label="是否启用">
              <a-select placeholder="请选择是否启用" v-model:value="itemScheduleData.status">
                <a-select-option value="1">启用</a-select-option>
                <a-select-option value="0">不启用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item label="说明" name="directions">
              <a-textarea v-model:value="itemScheduleData.directions" placeholder="请输入说明" />
            </a-form-item>
          </a-col>
        </a-row>
      </CollapseContainer>
      <CollapseContainer title="明细信息">
        <div>
          <a-row type="flex" style="margin-bottom: 10px" :gutter="16">
            <a-col :span="5">明细名称</a-col>
            <a-col :span="6">可选值</a-col>
            <a-col :span="3">是否启用</a-col>
            <a-col :span="2">排序</a-col>
            <a-col :span="6">说明</a-col>
            <a-col :span="2">操作</a-col>
          </a-row>
          <a-row type="flex" style="margin-bottom: 10px" :gutter="16" v-for="(item, index) in itemScheduleData.detailData" :key="index">
            <a-col :span="6" style="display: none">
              <a-form-item>
                <a-input placeholder="id" v-model:value="item.id" />
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item>
                <a-input placeholder="明细名称" v-model:value="item.itemName" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <a-input placeholder="可选值" v-model:value="item.defaultText" />
              </a-form-item>
            </a-col>
            <a-col :span="3">
              <a-form-item>
                <a-select placeholder="是否启用" v-model:value="item.status">
                  <a-select-option value="1">启用</a-select-option>
                  <a-select-option value="0">不启用</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-form-item>
                <a-input-number placeholder="排序" v-model:value="item.sortOrder" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <a-textarea placeholder="说明" v-model:value="item.directions" />
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-form-item>
                <Icon icon="ant-design:minus-outlined" @click="delRowCustom(index)" style="fontsize: 20px" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-button type="dashed" style="width: 98%; margin-top: 10px" @click="addRowCustom"> <Icon icon="ph:plus-bold" /> 添加明细信息 </a-button>
        </div>
      </CollapseContainer>
    </a-form>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { computed, reactive, unref, ref } from 'vue';
  import { BasicModal, useModalInner } from '/src/components/Modal';
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
  import { CollapseContainer } from '/@/components/Container';
  import { itemList, saveOrUpdateItem } from '../Template.api';

  // 声明Emits
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const formRef = ref();
  const labelCol = reactive({
    xs: { span: 24 },
    sm: { span: 5 },
  });
  const wrapperCol = reactive({
    xs: { span: 24 },
    sm: { span: 16 },
  });
  const validatorRules = {
    itemName: [{ required: true, message: '阶段名称不能为空', trigger: 'blur' }],
    sortOrder: [{ defaultValue: 1 }],
    status: [{ defaultValue: 1 }],
  };
  const itemScheduleData = reactive({
    id: 0,
    projectScheduleTemplateId: '',
    parentId: 0,
    itemName: '',
    defaultText: '',
    sortOrder: 1,
    status: '',
    directions: '',
    detailData: [],
  });

  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false, minHeight: 80 });
    isUpdate.value = !!data?.isUpdate;
    reset();
    itemScheduleData.projectScheduleTemplateId = data?.templateId;
    if (unref(isUpdate)) {
      itemScheduleData.id = data.record.id;
      Object.assign(itemScheduleData, data.record);
      const detailList = await itemList({ parentId: itemScheduleData.id, projectScheduleTemplateId: itemScheduleData.projectScheduleTemplateId });
      itemScheduleData.detailData = detailList;
      console.log(itemScheduleData);
    }
  });
  /**
   * 重置
   */
  function reset() {
    itemScheduleData.id = 0;
    itemScheduleData.parentId = 0;
    itemScheduleData.itemName = '';
    itemScheduleData.defaultText = '';
    itemScheduleData.sortOrder = 1;
    itemScheduleData.status = '';
    itemScheduleData.directions = '';
    itemScheduleData.detailData = [];
  }

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  //动态添加行
  function addRowCustom() {
    itemScheduleData.detailData.push({});
  }
  //删除行
  function delRowCustom(index) {
    itemScheduleData['detailData'].splice(index, 1);
    itemScheduleData.detailData.splice(index, 1);
  }
  async function handleSubmit() {
    formRef.value
      .validate()
      .then(async () => {
        try {
          console.log('formData', JSON.stringify(itemScheduleData));
          setModalProps({ confirmLoading: true });
          await saveOrUpdateItem(itemScheduleData, unref(isUpdate));
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      })
      .catch((error: ValidateErrorEntity<any>) => {
        console.log('error', error);
      });
  }
</script>
<style scoped>
  .ant-btn {
    padding: 0 10px;
    margin-left: 3px;
  }

  .ant-form-item-control {
    line-height: 0px;
  }

  /** 主表单行间距 */
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }

  /** Tab页面行间距 */
  .ant-tabs-content .ant-form-item {
    margin-bottom: 0px;
  }
</style>
