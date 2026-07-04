import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';

/**
 * 统计列表列定义
 * 注意：列点击事件在 index.vue 中通过 h() 函数实现
 */
export const statisticsColumns: BasicColumn[] = [
  {
    title: '员工名称',
    dataIndex: 'employeeName',
    width: 120,
    fixed: 'left',
  },
  {
    title: '总调休(小时)',
    dataIndex: 'totalOvertimeHours',
    width: 120,
    customRender({ text }) {
      return text?.toFixed(1) || '0.0';
    },
  },
  {
    title: '待确认调休(小时)',
    dataIndex: 'pendingOvertimeHours',
    width: 140,
    customRender({ text }) {
      return text?.toFixed(1) || '0.0';
    },
  },
  {
    title: '已确认调休(小时)',
    dataIndex: 'confirmedOvertimeHours',
    width: 140,
    customRender({ text }) {
      return text?.toFixed(1) || '0.0';
    },
  },
  {
    title: '已使用调休(小时)',
    dataIndex: 'usedLeaveHours',
    width: 140,
    customRender({ text }) {
      return text?.toFixed(1) || '0.0';
    },
  },
  {
    title: '剩余调休(小时)',
    dataIndex: 'remainingLeaveHours',
    width: 140,
    customRender({ record }) {
      const remaining = (record.confirmedOvertimeHours || 0) - (record.usedLeaveHours || 0);
      return remaining.toFixed(1);
    },
  },
];

/**
 * 搜索表单 Schema
 */
export const searchFormSchema: FormSchema[] = [
  {
    label: '员工名称',
    field: 'employeeName',
    component: 'Input',
    colProps: { span: 6 },
  },
];

/**
 * 加班记录弹窗列定义
 */
export const overtimeModalColumns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 120,
    customRender({ text }) {
      return text || '-';
    },
  },
  {
    title: '阶段名称',
    dataIndex: 'scheduleName',
    width: 100,
    customRender({ text }) {
      return text || '-';
    },
  },
  {
    title: '服务方式',
    dataIndex: 'serviceType_dictText',
    width: 80,
    customRender({ text }) {
      return text || '-';
    },
  },
  {
    title: '加班日期',
    dataIndex: 'overtimeDate',
    width: 100,
    customRender({ text }) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
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
    customRender({ text }) {
      return text || '-';
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
      return text || '-';
    },
  },
  {
    title: '确认时间',
    dataIndex: 'confirmTime',
    width: 150,
    customRender({ text }) {
      return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
    },
  },
];

/**
 * 加班记录弹窗列定义（带操作列）
 */
export const overtimeModalColumnsWithAction: BasicColumn[] = [
  ...overtimeModalColumns,
  {
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
    fixed: 'right',
    width: 80,
  },
];

/**
 * 调休使用记录弹窗列定义
 */
export const leaveRecordModalColumns: BasicColumn[] = [
  {
    title: '调休日期',
    dataIndex: 'leaveDate',
    width: 120,
    customRender({ text }) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '调休时长(小时)',
    dataIndex: 'leaveHours',
    width: 120,
  },
  {
    title: '调休原因',
    dataIndex: 'leaveReason',
    width: 300,
    customRender({ text }) {
      return text || '-';
    },
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
    width: 100,
    customRender({ text }) {
      return text || '-';
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 160,
    customRender({ text }) {
      return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
    },
  },
];

/**
 * 录入调休表单 Schema
 */
export const leaveRecordFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'staffId',
    component: 'Input',
    show: false,
  },
  {
    label: '员工',
    field: 'staffName',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '剩余调休',
    field: 'remainingHoursDisplay',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '调休日期',
    field: 'leaveDate',
    component: 'DatePicker',
    required: true,
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      style: { width: '100%' },
    },
  },
  {
    label: '调休时长(小时)',
    field: 'leaveHours',
    component: 'InputNumber',
    required: true,
    rules: [
      { required: true, message: '请输入调休时长' },
      {
        validator: async (_rule, value) => {
          if (value !== undefined && value !== null && value !== '') {
            if (value < 0.5) {
              return Promise.reject('调休时长不能小于0.5小时');
            }
            const remainder = (value * 10) % 5;
            if (remainder !== 0) {
              return Promise.reject('调休时长必须是0.5的整数倍');
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
      style: { width: '100%' },
    },
  },
  {
    label: '调休原因',
    field: 'leaveReason',
    component: 'InputTextArea',
    required: true,
    rules: [
      { required: true, message: '请输入调休原因' },
      { max: 500, message: '调休原因不能超过500字' },
    ],
    componentProps: {
      rows: 3,
      maxlength: 500,
      showCount: true,
    },
  },
];

/**
 * 加班记录弹窗搜索表单 Schema
 */
export const overtimeModalSearchFormSchema: FormSchema[] = [
  {
    label: '项目名称',
    field: 'projectName',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '加班日期',
    field: 'overtimeDate',
    component: 'RangePicker',
    componentProps: {
      valueType: 'Date',
      valueFormat: 'YYYY-MM-DD',
    },
    colProps: { span: 8 },
  },
];
