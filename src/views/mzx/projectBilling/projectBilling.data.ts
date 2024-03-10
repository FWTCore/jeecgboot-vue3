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
    label: '状态',
    field: 'billingStatus',
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
];

export function getStaffColumns(data): BasicColumn[] {
  const result: BasicColumn[] = [
    {
      title: '工作步骤',
      dataIndex: 'scheduleName',
      width: 200,
      fixed: 'left',
    },
    {
      title: '比例',
      dataIndex: 'itemCommission',
      width: 200,
      fixed: 'left',
    },
  ];
  data.forEach((value) => {
    result.push({
      title: value.staff,
      dataIndex: value.staffId,
      children: [
        {
          title: '是否参与',
          dataIndex: 'serviceFlag_' + value.staffId,
          width: 120,
          customRender({ text }) {
            if (text) {
              if (text === 1) {
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
          title: '提成比例',
          dataIndex: 'commission_' + value.staffId,
          edit: true,
          editRule: true,
          editComponent: 'InputNumber',
          width: 120,
        },
      ],
    });
  });
  return result;
}
