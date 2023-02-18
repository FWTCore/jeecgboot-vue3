import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from './validator';

export const columns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 200,
  },
  {
    title: '客户名称',
    dataIndex: 'customerName',
    width: 200,
  },
  {
    title: '合同金额',
    dataIndex: 'contractAmount',
    width: 70,
  },
  {
    title: '付款方式',
    dataIndex: 'paymentMethod_dictText',
    width: 70,
  },
  {
    title: '签单人',
    dataIndex: 'signPerson',
    width: 70,
  },
  {
    title: '负责人',
    dataIndex: 'leaderName',
    width: 70,
  },
  {
    title: '提成比例%',
    dataIndex: 'commissionRatio',
    width: 70,
  },
  {
    title: '项目状态',
    dataIndex: 'projectStatus_dictText',
    width: 60,
  },
  {
    title: '预计结束时间',
    dataIndex: 'estimatedEndTime',
    width: 80,
  },
  {
    title: '删除状态',
    dataIndex: 'delFlag_dictText',
    width: 80,
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
    label: '客户名称',
    field: 'customerName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '签单人',
    field: 'signPerson',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '负责人',
    field: 'leaderName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '付款方式',
    field: 'paymentMethod',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'project_payment_method',
      stringToNumber: true,
    },
  },
  {
    label: '项目状态',
    field: 'paymentMethod',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'project_project_status',
      stringToNumber: true,
    },
  },
  {
    label: '删除状态',
    field: 'delFlag',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'del_flag',
      stringToNumber: true,
    },
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
    label: '项目名称',
    field: 'projectName',
    required: true,
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
    dynamicRules: ({ model, schema }) => rules.duplicateCheckProject('biz_project', 'project_name', model, schema, true),
  },
  {
    label: '项目进度模板',
    field: 'projectScheduleTemplateId',
    required: true,
    component: 'Input',
    slot: 'remoteSearchScheduleTemplate',
    componentProps: {
      placeholder: '请选择项目进度模板',
    },
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    label: '客户名称',
    field: 'customerId',
    required: true,
    component: 'Input',
    slot: 'remoteSearchCustomer',
  },
  {
    label: '合同金额',
    field: 'contractAmount',
    component: 'InputNumber',
  },
  {
    label: '付款方式',
    field: 'paymentMethod',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'project_payment_method',
      stringToNumber: true,
    },
  },
  {
    label: '签单人',
    field: 'signPersonId',
    required: true,
    component: 'JSelectUser',
    componentProps: {
      labelKey: 'realname',
      rowKey: 'id',
      showSelectTable: false,
      isRadioSelection: true,
    },
  },
  {
    label: '负责人',
    field: 'leaderId',
    required: true,
    component: 'JSelectUser',
    componentProps: {
      labelKey: 'realname',
      rowKey: 'id',
      showSelectTable: false,
      isRadioSelection: true,
    },
  },
  {
    label: '预计结束时间',
    field: 'estimatedEndTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    label: '结束时间',
    field: 'endTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    label: '提成比例%',
    field: 'commissionRatio',
    component: 'InputNumber',
  },
  {
    label: '项目概况',
    field: 'overview',
    component: 'InputTextArea',
  },
];

export const memberColumns: BasicColumn[] = [
  {
    title: '项目成员',
    dataIndex: 'servicer',
    width: 200,
  },
];

export const searchMemberFormSchema: FormSchema[] = [
  {
    label: '成员',
    field: 'servicer',
    component: 'Input',
  },
];

export const memberFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '项目成员',
    field: 'servicerId',
    required: true,
    component: 'JSelectUser',
    componentProps: {
      labelKey: 'realname',
      rowKey: 'id',
      showSelectTable: false,
      isRadioSelection: true,
    },
  },
];
