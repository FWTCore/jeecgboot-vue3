import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 200,
    fixed: 'left',
  },
  {
    title: '实施提成金额',
    dataIndex: 'implementCommission',
    width: 70,
    slots: { customRender: 'implementCommission' },
  },
  {
    title: '负责人',
    dataIndex: 'leaderName',
    width: 70,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
  {
    title: '参与人员',
    dataIndex: 'participants',
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
    title: '结算状态',
    dataIndex: 'billingStatus_dictText',
    width: 70,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '项目名称',
    field: 'projectName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '项目状态',
    field: 'projectBillingStatus',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'project_billing_status',
      stringToNumber: true,
    },
  },
  {
    label: '负责人',
    field: 'leaderName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '参与人员',
    field: 'participants',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const detailColumns: BasicColumn[] = [
  {
    title: '周期',
    dataIndex: 'period',
    width: 60,
    fixed: 'left',
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
  {
    title: '员工',
    dataIndex: 'employeeName',
    width: 100,
    fixed: 'left',
  },
  {
    title: '综合补助',
    dataIndex: 'comprehensiveSubsidy',
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
    title: '人力成本',
    dataIndex: 'laborCost',
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
    title: '工作天数',
    dataIndex: 'workDays',
    width: 100,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
];