import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import dayjs, { Dayjs } from 'dayjs';
import { rules } from './validator';

export const salaryColumns: BasicColumn[] = [
  {
    title: '员工名称',
    dataIndex: 'employeeName',
    width: 60,
  },
  {
    title: '基本工资',
    dataIndex: 'salary',
    width: 100,
  },
  {
    title: '社保',
    dataIndex: 'socialInsurance',
    width: 100,
  },
  {
    title: '公积金',
    dataIndex: 'accumulationFund',
    width: 100,
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
    width: 60,
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 60,
    customRender({ text }) {
      if (text) {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return '-';
      }
    },
  },
  {
    title: '更新人',
    dataIndex: 'updateBy',
    width: 60,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 60,
    customRender({ text }) {
      if (text) {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return '-';
      }
    },
  },
];

export const searchSalaryColumns: FormSchema[] = [
  {
    label: '员工名称',
    field: 'employeeName',
    component: 'Input',
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
];
