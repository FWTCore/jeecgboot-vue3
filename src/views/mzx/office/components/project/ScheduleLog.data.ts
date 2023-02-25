import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import dayjs, { Dayjs } from 'dayjs';

export const scheduleColumns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 200,
    fixed: 'left',
  },
  {
    title: '条目名称',
    dataIndex: 'scheduleName',
    width: 200,
    fixed: 'left',
  },
  {
    title: '服务人',
    dataIndex: 'staff',
    width: 100,
  },
  {
    title: '服务方式',
    dataIndex: 'serviceType_dictText',
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
    width: 50,
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
    width: 200,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
  {
    title: '是否加班',
    dataIndex: 'overtimeFlag',
    width: 80,
    customRender({ text }) {
      if (text) {
        if (text === '1') {
          return '是';
        } else {
          return '否';
        }
      } else {
        return '-';
      }
    },
  },
  {
    title: '加班时长',
    dataIndex: 'overtime',
    width: 80,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
  {
    title: '是否完成',
    dataIndex: 'doneFlag',
    width: 80,
    customRender({ text }) {
      if (text) {
        if (text === '1') {
          return '是';
        } else {
          return '否';
        }
      } else {
        return '-';
      }
    },
  },
  {
    title: '是否归档',
    dataIndex: 'archiveFlag',
    width: 80,
    customRender({ text }) {
      if (text) {
        if (text === '1') {
          return '是';
        } else {
          return '否';
        }
      } else {
        return '-';
      }
    },
  },
  {
    title: '下次服务时间',
    dataIndex: 'nextPlanTime',
    width: 120,
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
    width: 200,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
];

export const searchScheduleFormSchema: FormSchema[] = [
  {
    label: '项目名称',
    field: 'projectName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '条目名称',
    field: 'scheduleName',
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
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '服务方式',
    field: 'serviceType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'project_schedule_service_type',
      stringToNumber: true,
    },
  },
  {
    label: '服务内容',
    field: 'serviceContent',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '是否加班',
    field: 'overtimeFlag',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
        {
          label: '全部',
          value: '',
          key: '',
        },
        {
          label: '是',
          value: '1',
          key: '1',
        },
        {
          label: '否',
          value: '0',
          key: '0',
        },
      ],
      defaultValue: '',
    },
  },
  {
    label: '是否完成',
    field: 'doneFlag',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
        {
          label: '全部',
          value: '',
          key: '',
        },
        {
          label: '是',
          value: '1',
          key: '1',
        },
        {
          label: '否',
          value: '0',
          key: '0',
        },
      ],
      defaultValue: '',
    },
  },
  {
    label: '是否归档',
    field: 'archiveFlag',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
        {
          label: '全部',
          value: '',
          key: '',
        },
        {
          label: '是',
          value: '1',
          key: '1',
        },
        {
          label: '否',
          value: '0',
          key: '0',
        },
      ],
      defaultValue: '',
    }, 
  },
];

export const scheduleDescItems: DescItem[] = [
  {
    label: '项目名称',
    field: 'projectName',
  },
  {
    label: '条目名称',
    field: 'scheduleName',
  },
  {
    label: '服务人',
    field: 'staff',
  },
  {
    label: '服务方式',
    field: 'serviceType',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
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
    label: '是否加班',
    field: 'overtimeFlag',
    render: (curVal, data) => {
      if (curVal) {
        if (curVal === '1') {
          return '是';
        } else {
          return '否';
        }
      } else {
        return '-';
      }
    },
  },
  {
    label: '加班时长',
    field: 'overtime',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
  {
    label: '是否完成',
    field: 'doneFlag',
    render: (curVal, data) => {
      if (curVal) {
        if (curVal === '1') {
          return '是';
        } else {
          return '否';
        }
      } else {
        return '-';
      }
    },
  },
  {
    label: '是否归档',
    field: 'archiveFlag',
    render: (curVal, data) => {
      if (curVal) {
        if (curVal === '1') {
          return '是';
        } else {
          return '否';
        }
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

export const scheduleFormSchema: FormSchema[] = [
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
    label: '条目名称',
    field: 'projectScheduleUsageItemId',
    required: true,
    component: 'Input',
    slot: 'remoteSearchSchedule',
    show: ({ values }) => {
      return !values.id;
    },
  },
  {
    label: '条目名称',
    field: 'scheduleName',
    component: 'Input',
    show: ({ values }) => {
      return !!values.id;
    },
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
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
    label: '服务方式',
    field: 'serviceType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'project_schedule_service_type',
      stringToNumber: true,
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
    label: '是否加班',
    field: 'overtimeFlag',
    component: 'Switch',
    defaultValue: 0,
    componentProps: {
      checkedChildren: '是',
      unCheckedChildren: '否',
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    label: '加班时长',
    field: 'overtime',
    component: 'InputNumber',
    ifShow: ({ values }) => {
      return values.overtimeFlag === 1 ? true : false;
    },
  },
  {
    label: '是否完成',
    field: 'doneFlag',
    component: 'Switch',
    defaultValue: 0,
    componentProps: {
      checkedChildren: '是',
      unCheckedChildren: '否',
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    label: '是否归档',
    field: 'archiveFlag',
    component: 'Switch',
    defaultValue: 0,
    componentProps: {
      checkedChildren: '是',
      unCheckedChildren: '否',
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    label: '下次服务时间',
    field: 'nextPlanTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      disabledDate: (current: Dayjs) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
      },
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
