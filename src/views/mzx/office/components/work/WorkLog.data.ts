import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import dayjs from 'dayjs';

export const workLogColumns: BasicColumn[] = [
  {
    title: '服务人',
    dataIndex: 'staff',
    width: 100,
  },
  {
    title: '服务时间',
    dataIndex: 'createTime',
    width: 100,
    customRender({ text }) {
      if (text) {
        return dayjs(text).format('YYYY-MM-DD');
      } else {
        return '-';
      }
    },
  },
  {
    title: '工时',
    dataIndex: 'workHours',
    width: 100,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
  {
    title: '服务内容',
    dataIndex: 'serviceContent',
    width: 300,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
  {
    title: '下次服务时间',
    dataIndex: 'nextPlanTime',
    width: 100,
    customRender({ text }) {
      if (text) {
        return dayjs(text).format('YYYY-MM-DD');
      } else {
        return '-';
      }
    },
  },
  {
    title: '下次服务内容',
    dataIndex: 'nextPlanContent',
    width: 300,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
];

export const searchWorkLogFormSchema: FormSchema[] = [
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

export const descItems: DescItem[] = [
  {
    label: '服务人',
    field: 'staff',
  },
  {
    label: '服务时间',
    field: 'createTime',
    render: (curVal, data) => {
      if (curVal) {
        return dayjs(curVal).format('YYYY-MM-DD');
      } else {
        return '-';
      }
    },
  },
  {
    label: '工时',
    field: 'workHours',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
  {
    label: '服务内容',
    field: 'serviceContent',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
  {
    label: '下次服务时间',
    field: 'nextPlanTime',
    render: (curVal, data) => {
      if (curVal) {
        return dayjs(curVal).format('YYYY-MM-DD');
      } else {
        return '-';
      }
    },
  },
  {
    label: '下次服务内容',
    field: 'nextPlanContent',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
];

export const workLogFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
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
