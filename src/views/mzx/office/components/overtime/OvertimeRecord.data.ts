import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import dayjs, { Dayjs } from 'dayjs';

export const overtimeColumns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 120,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
  {
    title: '阶段名称',
    dataIndex: 'scheduleName',
    width: 120,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
  {
    title: '服务方式',
    dataIndex: 'serviceType_dictText',
    width: 80,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
  // {
  //   title: '服务内容',
  //   dataIndex: 'serviceContent',
  //   width: 150,
  //   align: 'left',
  //   customRender({ text }) {
  //     if (text) {
  //       return text;
  //     } else {
  //       return '-';
  //     }
  //   },
  // },
  {
    title: '员工姓名',
    dataIndex: 'staffName',
    width: 80,
  },
  {
    title: '加班日期',
    dataIndex: 'overtimeDate',
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
    title: '加班时长(小时)',
    dataIndex: 'overtimeHours',
    width: 100,
  },
  {
    title: '加班原因',
    dataIndex: 'overtimeReason',
    width: 150,
    align: 'left',
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
  {
    title: '确认状态',
    dataIndex: 'confirmStatus_dictText',
    width: 80,
  },
  {
    title: '确认人',
    dataIndex: 'confirmerName',
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
    title: '确认时间',
    dataIndex: 'confirmTime',
    width: 150,
    customRender({ text }) {
      if (text) {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return '-';
      }
    },
  },
  {
    title: '企微打卡匹配',
    dataIndex: 'weworkClockMatchFlag',
    width: 120,
    customRender({ text }) {
      if (text === 1 || text === true) {
        return '是';
      } else if (text === 0 || text === false) {
        return '否';
      } else {
        return '-';
      }
    },
  },
  {
    title: '录入时间',
    dataIndex: 'createTime',
    width: 150,
    customRender({ text }) {
      if (text) {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return '-';
      }
    },
  },
];

export const searchOvertimeFormSchema: FormSchema[] = [
  {
    label: '员工姓名',
    field: 'staffName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '加班日期',
    field: 'overtimeDate',
    component: 'RangePicker',
    colProps: { span: 6 },
    componentProps: {
      valueType: 'Date',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    label: '项目名称',
    field: 'projectName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '确认状态',
    field: 'confirmStatus',
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
          label: '待确认',
          value: '0',
          key: '0',
        },
        {
          label: '已确认',
          value: '1',
          key: '1',
        },
      ],
      defaultValue: '',
    },
  },
  {
    label: '服务方式',
    field: 'serviceType',
    component: 'JDictSelectTag',
    colProps: { span: 6 },
    componentProps: {
      dictCode: 'project_schedule_service_type',
      stringToNumber: true,
    },
  },
];

export const overtimeDescItems: DescItem[] = [
  {
    label: '项目名称',
    field: 'projectName',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
  {
    label: '阶段名称',
    field: 'scheduleName',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
  {
    label: '员工姓名',
    field: 'staffName',
  },
  {
    label: '服务方式',
    field: 'serviceType_dictText',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
  {
    label: '加班日期',
    field: 'overtimeDate',
    render: (curVal, data) => {
      if (curVal) {
        return dayjs(curVal).format('YYYY-MM-DD');
      } else {
        return '-';
      }
    },
  },
  {
    label: '加班时长(小时)',
    field: 'overtimeHours',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
  {
    label: '加班原因',
    field: 'overtimeReason',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
  {
    label: '确认状态',
    field: 'confirmStatus_dictText',
  },
  {
    label: '确认人',
    field: 'confirmerName',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
  {
    label: '确认时间',
    field: 'confirmTime',
    render: (curVal, data) => {
      if (curVal) {
        return dayjs(curVal).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return '-';
      }
    },
  },
  {
    label: '企业微信打卡匹配',
    field: 'weworkClockMatchFlag',
    render: (curVal, data) => {
      if (curVal === 1 || curVal === true) {
        return '是';
      } else if (curVal === 0 || curVal === false) {
        return '否';
      } else {
        return '-';
      }
    },
  },
  {
    label: '创建时间',
    field: 'createTime',
    render: (curVal, data) => {
      if (curVal) {
        return dayjs(curVal).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return '-';
      }
    },
  },
];

export const overtimeFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '',
    field: 'staffId',
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
    label: '阶段名称',
    field: 'projectScheduleUsageItemId',
    required: true,
    component: 'Input',
    slot: 'remoteSearchSchedule',
    show: ({ values }) => {
      return !values.id;
    },
  },
  {
    label: '阶段名称',
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
    label: '员工姓名',
    field: 'staffName',
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
    label: '加班日期',
    field: 'overtimeDate',
    component: 'DatePicker',
    required: true,
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    label: '加班时长(小时)',
    field: 'overtimeHours',
    component: 'InputNumber',
    required: true,
    rules: [
      { required: true, message: '请输入加班时长' },
      {
        validator: async (_rule, value) => {
          if (value !== undefined && value !== null && value !== '') {
            // 检查是否是0.5的整数倍
            if (value < 0.5) {
              return Promise.reject('加班时长不能小于0.5小时');
            }
            const remainder = (value * 10) % 5;
            if (remainder !== 0) {
              return Promise.reject('加班时长必须是0.5的整数倍');
            }
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
    componentProps: {
      min: 0.5,
      max: 8,
      step: 0.5,
      precision: 1,
    },
  },
  {
    label: '加班原因',
    field: 'overtimeReason',
    component: 'InputTextArea',
    required: true,
    rules: [
      { required: true, message: '请输入加班原因' },
      { max: 500, message: '加班原因不能超过500字' },
    ],
    componentProps: {
      rows: 3,
      maxlength: 500,
      showCount: true,
    },
  },
  {
    label: '企微打卡匹配',
    field: 'weworkClockMatchFlag',
    component: 'Checkbox',
    defaultValue: false,
    required: true,
    rules: [
      {
        required: true,
        validator: async (_rule, value) => {
          if (value !== true) {
            return Promise.reject('请确认企业微信打卡匹配');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
    renderComponentContent: '已核对企微打卡记录',
  },
];
