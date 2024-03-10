import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import dayjs, { Dayjs } from 'dayjs';

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
    title: '共计收入',
    dataIndex: 'totalIncome',
    width: 40,
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
];

export const searchpayrollColumns: FormSchema[] = [
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
export const detailColumns: BasicColumn[] = [
  {
    title: '周期',
    dataIndex: 'period',
    width: 40,
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 200,
  },
  {
    title: '提成占比',
    dataIndex: 'commissionRatio',
    width: 40,
  },
  {
    title: '金额',
    dataIndex: 'implementCommission',
    width: 40,
  },
];

export const detailSchema: DescItem[] = [
  {
    label: '员工名称',
    field: 'employeeName',
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
    label: '项目提成',
    field: 'implementCommission',
  },
  {
    label: '共计收入',
    field: 'totalIncome',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
];
