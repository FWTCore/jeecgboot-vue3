import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '项目状态',
    dataIndex: 'projectStatus_dictText',
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
    title: '项目名称',
    dataIndex: 'projectName',
    width: 200,
    fixed: 'left',
  },
  {
    title: '项目金额',
    dataIndex: 'projectAmount',
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
    title: '综合费用',
    dataIndex: 'comprehensiveCost',
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
    title: '项目成本',
    dataIndex: 'projectCost',
    width: 70,
    slots: { customRender: 'projectCost' },
  },
  {
    title: '销售提成',
    dataIndex: 'saleCommission',
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
    title: '实施提成',
    dataIndex: 'implementCommission',
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
    title: '成本率%',
    dataIndex: 'costRatio',
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
    title: '是否超生命线',
    dataIndex: 'superLifeline',
    width: 70,
    slots: { customRender: 'superLifeline' },
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
    field: 'projectStatus',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'project_project_status',
      stringToNumber: true,
    },
  },
  {
    label: '是否超生命线',
    field: 'superLifeline',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
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
