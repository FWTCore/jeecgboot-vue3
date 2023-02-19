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
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
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

export const serviceLogColumns: BasicColumn[] = [
  {
    title: '服务人',
    dataIndex: 'staff',
    width: 120,
  },
  {
    title: '服务时间',
    dataIndex: 'createTime',
    width: 100,
  },
  {
    title: '工时',
    dataIndex: 'workHours',
    width: 100,
  },
  {
    title: '服务内容',
    dataIndex: 'serviceContent',
    width: 100,
  },
  {
    title: '下次服务时间',
    dataIndex: 'nextPlanTime',
    width: 100,
  },
  {
    title: '下次服务内容',
    dataIndex: 'nextPlanContent',
    width: 100,
  },
];

export const serviceLogSearchFormSchema: FormSchema[] = [
  {
    label: '服务人',
    field: 'staff',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '服务时间',
    field: 'createTime',
    component: 'RangePicker',
    colProps: { span: 6 },
    componentProps: {
      valueType: 'Date',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '服务内容',
    field: 'serviceContent',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const serviceLogFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '客户名称',
    field: 'customerName',
    required: true,
    component: 'Input',
    dynamicDisabled: ({}) => {
      return true;
    },
  },
  {
    label: '服务人员',
    field: 'staff',
    component: 'Input',
    dynamicDisabled: ({}) => {
      return true;
    },
  },
  {
    label: '工时',
    field: 'workHours',
    component: 'InputNumber',
  },
  {
    label: '服务内容',
    field: 'serviceContent',
    component: 'InputTextArea',
  },
  {
    label: '下次服务时间',
    field: 'nextPlanTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    dynamicDisabled: ({ values }) => {
      if (values.id && values && values.nextPlanTime) {
        if (new Date(values.nextPlanTime) > new Date()) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
  },
  {
    label: '下次服务内容',
    field: 'nextPlanContent',
    component: 'InputTextArea',
    dynamicDisabled: ({ values }) => {
      if (values.id && values && values.nextPlanTime) {
        if (new Date(values.nextPlanTime) > new Date()) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
  },
];
