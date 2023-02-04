import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '模板名称',
    dataIndex: 'scheduleTemplateName',
    width: 400,
  },
  {
    title: '状态',
    dataIndex: 'status_dictText',
    width: 120,
  },
  {
    title: '说明',
    dataIndex: 'directions',
    // width: 120
  },
];

export const recycleBincolumns: BasicColumn[] = [
  {
    title: '模板名称',
    dataIndex: 'scheduleTemplateName',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status_dictText',
    width: 120,
  },
  {
    title: '说明',
    dataIndex: 'directions',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '模板名称',
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

export const itemColumns: BasicColumn[] = [
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
    label: '名称',
    field: 'itemName',
    component: 'Input',
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

export const stageFormSchema: FormSchema[] = [
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '阶段名称',
    field: 'itemName',
    required: true,
    component: 'Input',
  },
  {
    label: '可选值',
    field: 'defaultText',
    component: 'Input',
  },
  {
    label: '说明',
    field: 'directions',
    component: 'InputTextArea',
  },
  {
    label: '排序',
    field: 'sortOrder',
    component: 'InputNumber',
    defaultValue: 1,
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
