import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import dayjs, { Dayjs } from 'dayjs';

export function getScheduleColumns(data): BasicColumn[] {
  const result: BasicColumn[] = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      width: 200,
      fixed: 'left',
    },
    {
      title: '服务人',
      dataIndex: 'staff',
      width: 200,
      fixed: 'left',
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      width: 200,
      fixed: 'left',
      customRender({ text }) {
        if (text) {
          return dayjs(text).format('YYYY-MM-DD');
        } else {
          return '';
        }
      },
    },
  ];
  data.forEach((value) => {
    result.push({
      title: value.title,
      dataIndex: value.dataIndex + '_cost',
      width: 200,
    });
    result.push({
      title: value.title + '备注',
      dataIndex: value.dataIndex + '_remark',
      width: 200,
    });
  });
  return result;
}
export const searchFormSchema: FormSchema[] = [
  {
    label: '项目名称',
    field: 'projectName',
    component: 'Input',
    colProps: { span: 6 },
  },
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
      valueFormat: 'YYYY-MM-DD',
    },
  },
];

export function getScheduleDescItems(data): DescItem[] {
  const result: DescItem[] = [
    {
      label: '项目名称',
      field: 'projectName',
    },
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
  ];
  data.forEach((value) => {
    result.push({
      label: value.title,
      field: value.dataIndex + '_cost',
    });
    result.push({
      label: value.title + '备注',
      field: value.dataIndex + '_remark',
    });
  });
  return result;
}

export function getScheduleFormSchema(data): FormSchema[] {
  const result: FormSchema[] = [
    {
      label: '',
      field: 'id',
      component: 'Input',
      show: false,
    },
    {
      label: '项目名称',
      field: 'projectId',
      required: true,
      component: 'Input',
      slot: 'remoteSearchProject',
      show: ({ values }) => {
        return !values.id;
      },
    },
    {
      label: '项目名称',
      field: 'projectName',
      component: 'Input',
      show: ({ values }) => {
        return !!values.id;
      },
      dynamicDisabled: ({ values }) => {
        return !!values.id;
      },
    },
    {
      label: '服务人id',
      field: 'staffId',
      component: 'Input',
      show: false,
    },
    {
      label: '服务人',
      field: 'staff',
      component: 'Input',
      dynamicDisabled: ({}) => {
        return true;
      },
    },
    {
      label: '时间',
      field: 'createTime',
      component: 'DatePicker',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        disabledDate: (current: Dayjs) => {
          // Can not select days before today and today
          return current && current < dayjs().endOf('day');
        },
      },
      dynamicDisabled: ({}) => {
        return true;
      },
    },
  ];
  data.forEach((value) => {
    result.push({
      label: value.title,
      field: value.dataIndex + '_cost',
      component: 'Input',
    });
    result.push({
      label: value.title + '备注',
      field: value.dataIndex + '_remark',
      component: 'InputTextArea',
    });
  });
  return result;
}
