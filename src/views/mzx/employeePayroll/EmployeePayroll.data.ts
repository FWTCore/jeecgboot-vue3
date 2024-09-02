import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import dayjs, { Dayjs } from 'dayjs';
import { rules } from './validator';

export const payrollColumns: BasicColumn[] = [
  {
    title: '周期',
    dataIndex: 'period',
    width: 40,
    fixed: 'left',
  },
  {
    title: '员工名称',
    dataIndex: 'employeeName',
    width: 60,
    fixed: 'left',
  },
  {
    title: '基本工资',
    dataIndex: 'salary',
    width: 40,
  },
  {
    title: '社保',
    dataIndex: 'socialInsurance',
    width: 40,
  },
  {
    title: '公积金',
    dataIndex: 'accumulationFund',
    width: 40,
  },
  {
    title: '项目补助',
    dataIndex: 'projectSubsidy',
    width: 40,
  },
  {
    title: '交通补助',
    dataIndex: 'trafficSubsidy',
    width: 40,
  },
  {
    title: '住宿补助',
    dataIndex: 'accommodationSubsidy',
    width: 40,
  },
  {
    title: '用餐补助',
    dataIndex: 'diningSubsidy',
    width: 40,
  },
  {
    title: '其他补助',
    dataIndex: 'otherSubsidy',
    width: 40,
  },
  {
    title: '项目提成',
    dataIndex: 'implementCommission',
    width: 70,
    slots: { customRender: 'implementCommission' },
  },
  {
    title: '工资状态',
    dataIndex: 'payrollStatusDesc',
    width: 40,
  },
  {
    title: '确认人',
    dataIndex: 'updateBy',
    width: 40,
  },
];

export const searchpayrollColumns: FormSchema[] = [
  {
    label: '员工名称',
    field: 'employeeName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '周期',
    field: 'periodDate',
    component: 'MonthPicker',
    componentProps: ({ formModel }) => {
      return {
        valueFormat: 'YYYY-MM',
      };
    },
    colProps: { span: 6 },
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
    label: '员工名称',
    field: 'employeeId',
    required: true,
    component: 'JSelectUser',
    componentProps: {
      labelKey: 'realname',
      rowKey: 'id',
      showSelectTable: false,
      isRadioSelection: true,
    },
    // dynamicRules: ({ model, schema }) => rules.duplicateCheckProject('biz_employee_salary', 'employee_id', model, schema, true),
  },
  {
    label: '基本工资',
    field: 'salary',
    component: 'InputNumber',
    required: true,
  },
  {
    label: '社保',
    field: 'socialInsurance',
    component: 'InputNumber',
    required: true,
  },
  {
    label: '公积金',
    field: 'accumulationFund',
    component: 'InputNumber',
    required: true,
  },
  {
    label: '项目补助（员工）',
    field: 'collectProjectSubsidy',
    component: 'InputNumber',
    dynamicDisabled: ({ values }) => {
      return true;
    },
  },
  {
    label: '项目补助',
    field: 'projectSubsidy',
    component: 'InputNumber',
    required: true,
  },
  {
    label: '项目补助备注',
    field: 'projectSubsidyRemark',
    component: 'InputTextArea',
  },
  {
    label: '交通补助（员工）',
    field: 'collectTrafficSubsidy',
    component: 'InputNumber',
    dynamicDisabled: ({ values }) => {
      return true;
    },
  },
  {
    label: '交通补助',
    field: 'trafficSubsidy',
    component: 'InputNumber',
    required: true,
  },
  {
    label: '交通补助备注',
    field: 'trafficSubsidyRemark',
    component: 'InputTextArea',
  },
  {
    label: '住宿补助（员工）',
    field: 'collectAccommodationSubsidy',
    component: 'InputNumber',
    dynamicDisabled: ({ values }) => {
      return true;
    },
  },
  {
    label: '住宿补助',
    field: 'accommodationSubsidy',
    component: 'InputNumber',
    required: true,
  },
  {
    label: '住宿补助备注',
    field: 'accommodationSubsidyRemark',
    component: 'InputTextArea',
  },
  {
    label: '用餐补助（员工）',
    field: 'collectDiningSubsidy',
    component: 'InputNumber',
    dynamicDisabled: ({ values }) => {
      return true;
    },
  },
  {
    label: '用餐补助',
    field: 'diningSubsidy',
    component: 'InputNumber',
    required: true,
  },
  {
    label: '用餐补助备注',
    field: 'diningSubsidyRemark',
    component: 'InputTextArea',
  },
  {
    label: '其他补助（员工）',
    field: 'collectOtherSubsidy',
    component: 'InputNumber',
    dynamicDisabled: ({ values }) => {
      return true;
    },
  },
  {
    label: '其他补助',
    field: 'otherSubsidy',
    component: 'InputNumber',
    required: true,
  },
  {
    label: '其他补助备注',
    field: 'otherSubsidyRemark',
    component: 'InputTextArea',
  },
  {
    label: '周期',
    field: 'periodDate',
    component: 'MonthPicker',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        valueFormat: 'YYYY-MM',
      };
    },
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
];

export const detailSchema: DescItem[] = [
  {
    label: '员工名称',
    field: 'employeeName',
  },
  {
    label: '基本工资',
    field: 'salary',
  },
  {
    label: '社保',
    field: 'socialInsurance',
  },
  {
    label: '公积金',
    field: 'accumulationFund',
  },
  {
    label: '项目补助（员工）',
    field: 'collectProjectSubsidy',
  },
  {
    label: '项目补助',
    field: 'projectSubsidy',
  },
  {
    label: '项目补助备注',
    field: 'projectSubsidyRemark',
  },
  {
    label: '交通补助（员工）',
    field: 'collectTrafficSubsidy',
  },
  {
    label: '交通补助',
    field: 'trafficSubsidy',
  },
  {
    label: '交通补助备注',
    field: 'trafficSubsidyRemark',
  },
  {
    label: '住宿补助（员工）',
    field: 'collectAccommodationSubsidy',
  },
  {
    label: '住宿补助',
    field: 'accommodationSubsidy',
  },
  {
    label: '住宿补助备注',
    field: 'accommodationSubsidyRemark',
  },
  {
    label: '用餐补助（员工）',
    field: 'collectDiningSubsidy',
  },
  {
    label: '用餐补助',
    field: 'diningSubsidy',
  },
  {
    label: '用餐补助备注',
    field: 'diningSubsidyRemark',
  },
  {
    label: '其他补助（员工）',
    field: 'collectOtherSubsidy',
  },
  {
    label: '其他补助',
    field: 'otherSubsidy',
  },
  {
    label: '其他补助备注',
    field: 'otherSubsidyRemark',
  },
  {
    label: '周期',
    field: 'periodDate',
    render: (curVal, data) => {
      if (curVal) {
        return dayjs(curVal).format('YYYY-MM');
      } else {
        return '-';
      }
    },
  },
  {
    label: '工资状态',
    field: 'payrollStatusDesc',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
  {
    label: '确认人',
    field: 'updateBy',
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
    field: 'updateTime',
    render: (curVal, data) => {
      if (curVal) {
        return dayjs(curVal).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return '-';
      }
    },
  },
];
