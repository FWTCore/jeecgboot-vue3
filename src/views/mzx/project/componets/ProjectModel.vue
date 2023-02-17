<template>
  <BasicModal
    v-bind="$attrs"
    :showOkBtn="false"
    :showCancelBtn="false"
    @register="registerModal"
    :title="getTitle"
    width="1200px"
    @cancel="cancelModel"
  >
    <div class="step-form-form">
      <a-steps :current="current">
        <a-step title="项目信息" @click="handleStepPrev" />
        <a-step title="模板信息" @click="handleStep1Next" />
        <a-step title="项目成员" @click="handleStep2Next" />
      </a-steps>
    </div>
    <div class="mt-5">
      <Step1 @next="handleStep1Next" v-show="current === 0" />
      <Step2 @prev="handleStepPrev" @next="handleStep2Next" v-show="current === 1" v-if="state.initSetp2" />
      <Step3 v-show="current === 2" @redo="handleRedo" v-if="state.initSetp3" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, computed, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/src/components/Modal';
  import Step1 from './ProjectModelStep1.vue';
  import Step2 from './ProjectModelStep2.vue';
  import Step3 from './ProjectModelStep3.vue';
  // 声明Emits
  const emit = defineEmits(['register', 'success']);

  const current = ref(0);
  const state = reactive({
    initSetp2: false,
    initSetp3: false,
  });
  const isUpdate = ref(true);

  //表单赋值
  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false, minHeight: 80 });
    isUpdate.value = !!data?.isUpdate;
  });

  function cancelModel() {
    emit('success');
  }

  function handleStep1Next(step1Values: any) {
    current.value = 1;
    state.initSetp2 = true;
    console.log(step1Values);
  }
  function handleStepPrev() {
    current.value--;
  }
  function handleStep2Next(step2Values: any) {
    current.value = 2;
    state.initSetp3 = true;
    console.log(step2Values);
  }
  function handleRedo() {
    current.value = 0;
    state.initSetp2 = false;
    state.initSetp3 = false;
  }
  //设置标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增客户' : '编辑客户'));
</script>
<style lang="less" scoped>
  .step-form-content {
    padding: 24px;
    background-color: @component-background;
  }

  .step-form-form {
    width: 750px;
    margin: 0 auto;
  }
</style>
