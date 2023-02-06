import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '客户编码',
    dataIndex: 'customerCode',
    width: 200,
  },
  {
    title: '客户名称',
    dataIndex: 'customerName',
    width: 400,
  },
  {
    title: '数据源',
    dataIndex: 'dataSource_dictText',
    width: 120,
  },
  {
    title: '客户概况',
    dataIndex: 'overview',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '客户编码',
    field: 'customerCode',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '客户名称',
    field: 'customerName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '数据源',
    field: 'dataSource',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'customer_data_source',
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
    label: '客户编码',
    field: 'customerCode',
    required: true,
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    label: '客户名称',
    field: 'customerName',
    required: true,
    component: 'Input',
  },
  {
    label: '第三方id',
    field: 'thirdId',
    component: 'Input',
  },
  {
    label: '客户概况',
    field: 'overview',
    component: 'InputTextArea',
  },
  {
    field: 'dataSource',
    label: '数据源',
    defaultValue: 1,
    component: 'JDictSelectTag',
    componentProps: {
      type: 'radioButton',
      dictCode: 'customer_data_source',
      stringToNumber: true,
    },
  },
];
