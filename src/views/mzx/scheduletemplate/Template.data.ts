import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '模板名称',
    dataIndex: 'scheduleTemplateName',
  },
  {
    title: '状态',
    dataIndex: 'status_dictText',
    width: 80,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'scheduleTemplateName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'dict_item_status',
      stringToNumber: true,
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '模板名称',
    field: 'scheduleTemplateName',
    required: true,
    component: 'Input',
  },
  {
    label: '说明',
    field: 'directions',
    component: 'InputTextArea',
  },
  {
    field: 'status',
    label: '是否启用',
    defaultValue: 1,
    component: 'JDictSelectTag',
    componentProps: {
      type: 'radioButton',
      dictCode: 'dict_item_status',
      stringToNumber: true,
    },
  },
];

export const stageColumns: BasicColumn[] = [
  {
    title: '阶段名称',
    dataIndex: 'itemName',
    width: 200,
  },
  {
    title: '可选值',
    dataIndex: 'defaultText',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status_dictText',
    width: 120,
  },
];

export const itemSearchFormSchema: FormSchema[] = [
  {
    label: '阶段名称',
    field: 'itemName',
    component: 'Input',
  },
  {
    label: '阶段状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'dict_item_status',
      stringToNumber: true,
    },
  },
];

export const detailColumns: BasicColumn[] = [
  {
    title: '明细名称',
    dataIndex: 'itemName',
    width: 200,
  },
  {
    title: '可选值',
    dataIndex: 'defaultText',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status_dictText',
    width: 120,
  },
];

export const stageFormSchema: FormSchema[] = [
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
    colProps: {
      span: 8,
    },
  },
  {
    label: '阶段名称',
    field: 'itemName',
    required: true,
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    label: '可选值',
    field: 'defaultText',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    label: '排序',
    field: 'sortOrder',
    component: 'InputNumber',
    defaultValue: 1,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'status',
    label: '是否启用',
    defaultValue: 1,
    component: 'JDictSelectTag',
    componentProps: {
      type: 'radioButton',
      dictCode: 'dict_item_status',
      stringToNumber: true,
    },
    colProps: {
      span: 8,
    },
  },
  {
    label: '说明',
    field: 'directions',
    component: 'InputTextArea',
  },
];

export const detailFormSchema: FormSchema[] = [
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '明细名称',
    field: 'itemName',
    required: true,
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    label: '可选值',
    field: 'defaultText',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    label: '说明',
    field: 'directions',
    component: 'InputTextArea',
    colProps: {
      span: 8,
    },
  },
  {
    label: '排序',
    field: 'sortOrder',
    component: 'InputNumber',
    defaultValue: 1,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'status',
    label: '是否启用',
    defaultValue: 1,
    component: 'JDictSelectTag',
    componentProps: {
      type: 'radioButton',
      dictCode: 'dict_item_status',
      stringToNumber: true,
    },
    colProps: {
      span: 8,
    },
  },
];
