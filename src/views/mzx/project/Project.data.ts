import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from './validator';
import dayjs, { Dayjs } from 'dayjs';
import { getAllProjectTypeList } from './Project.api';
import { toRaw } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 100,
    fixed: 'left',
    customRender({ text }) {
      if (text) {
        return dayjs(text).format('YYYY-MM-DD');
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
    title: '客户名称',
    dataIndex: 'customerName',
    width: 200,
    fixed: 'left',
  },
  {
    title: '签单人',
    dataIndex: 'signPerson',
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
    title: '负责人',
    dataIndex: 'leaderName',
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
    title: '合同金额',
    dataIndex: 'contractAmount',
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
    title: '销售提成比例%',
    dataIndex: 'saleCommissionRatio',
    width: 150,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
  {
    title: '实施提成比例%',
    dataIndex: 'implementCommissionRatio',
    width: 150,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
  {
    title: '项目类型',
    dataIndex: 'projectTypeName',
    width: 150,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
  {
    title: '生命线%',
    dataIndex: 'lifeLine',
    width: 150,
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
    title: '综合费用说明',
    dataIndex: 'comprehensiveRemark',
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
    title: '预计结束时间',
    dataIndex: 'estimatedEndTime',
    width: 200,
    customRender({ text }) {
      if (text) {
        return dayjs(text).format('YYYY-MM-DD');
      } else {
        return '-';
      }
    },
  },
  {
    title: '项目状态',
    dataIndex: 'projectStatus_dictText',
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
    title: '信息来源',
    dataIndex: 'source_dictText',
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
    component: 'Input',
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
    show: ({ values }) => {
      return !values.id;
    },
  },
  {
    label: '项目进度模板',
    field: 'scheduleTemplateName',
    component: 'Input',
    show: ({ values }) => {
      return !!values.id;
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
    show: ({ values }) => {
      return !values.id;
    },
  },
  {
    label: '客户名称',
    field: 'customerName',
    component: 'Input',
    show: ({ values }) => {
      return !!values.id;
    },
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    label: '合同金额',
    field: 'contractAmount',
    component: 'InputNumber',
    required: true,
  },
  {
    label: '付款方式',
    field: 'paymentMethod',
    component: 'Input',
    required: true,
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
    // show: ({ values }) => {
    //   return !values.id;
    // },
  },
  // {
  //   label: '负责人',
  //   field: 'leaderName',
  //   component: 'Input',
  //   show: ({ values }) => {
  //     return !!values.id;
  //   },
  //   dynamicDisabled: ({ values }) => {
  //     return !!values.id;
  //   },
  // },
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
  // {
  //   label: '提成比例%',
  //   field: 'commissionRatio',
  //   component: 'InputNumber',
  //   defaultValue: '8',
  //   dynamicDisabled: ({}) => {
  //     return true;
  //   },
  // },
  {
    label: '销售提成比例%',
    field: 'saleCommissionRatio',
    component: 'InputNumber',
    defaultValue: '8',
  },
  {
    label: '项目类型',
    field: 'projectType',
    required: true,
    component: 'ApiSelect',
    componentProps: ({ formActionType, formModel }) => {
      const resultdata = {
        numberToString: true,
        api: getAllProjectTypeList,
        // params: { id: formModel.projectTypeId }, // 这不能少
        labelField: 'projectTypeName',
        valueField: 'id',
        immediate: true,
        onChange: (e) => {
          const selectValue = toRaw(e);
          if (selectValue === formModel.projectTypeId) {
            return true;
          }
          const selectObj = selectValue[0];
          console.log(selectObj);
          formActionType.setFieldsValue({
            lifeLine: selectObj.lifeLine,
            implementCommissionRatio: selectObj.commissionRatio,
            projectTypeId: selectObj.value,
          });
          return true;
        },
        // atfer request callback
        onOptionsChange: (options) => {
          //console.log('get options', options.length, options);
        },
      };
      return resultdata;
    },
  },
  {
    label: '项目类型',
    field: 'projectTypeId',
    component: 'Input',
    show: false,
  },
  {
    label: '项目类型',
    field: 'projectTypeName',
    component: 'Input',
    show: false,
  },
  {
    label: '实施提成比例%',
    field: 'implementCommissionRatio',
    component: 'InputNumber',
    dynamicDisabled: ({ values }) => {
      return true;
    },
  },
  {
    label: '生命线%',
    field: 'lifeLine',
    component: 'InputNumber',
    dynamicDisabled: ({ values }) => {
      return true;
    },
  },
  {
    label: '综合费用',
    field: 'comprehensiveCost',
    component: 'InputNumber',
  },
  {
    label: '综合费用说明',
    field: 'comprehensiveRemark',
    component: 'InputTextArea',
  },
  {
    label: '项目概况',
    field: 'overview',
    component: 'InputTextArea',
  },
  {
    label: '信息来源',
    field: 'source',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'project_project_source',
      placeholder: '请选择信息来源',
      stringToNumber: true,
    },
  },
];

export const memberColumns: BasicColumn[] = [
  {
    title: '项目成员',
    dataIndex: 'staff',
    width: 200,
  },
];

export const searchMemberFormSchema: FormSchema[] = [
  {
    label: '成员',
    field: 'staff',
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
    field: 'staffId',
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
    title: '工时(天)',
    dataIndex: 'workHours',
    width: 50,
  },
  {
    title: '服务内容',
    dataIndex: 'serviceContent',
    width: 200,
  },
  {
    title: '是否加班',
    dataIndex: 'overtimeFlag',
    width: 80,
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
    title: '加班时长(时)',
    dataIndex: 'overtime',
    width: 50,
  },
  {
    title: '是否完成',
    dataIndex: 'doneFlag',
    width: 80,
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
    title: '是否归档',
    dataIndex: 'archiveFlag',
    width: 80,
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
    title: '下次服务时间',
    dataIndex: 'nextPlanTime',
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
    title: '下次服务内容',
    dataIndex: 'nextPlanContent',
    width: 200,
  },
];

export const searchScheduleFormSchema: FormSchema[] = [
  {
    label: '服务人',
    field: 'staff',
    component: 'Input',
  },
  {
    label: '服务时间',
    field: 'createTime',
    component: 'RangePicker',
    componentProps: {
      valueType: 'Date',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '服务内容',
    field: 'serviceContent',
    component: 'Input',
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
    label: '',
    field: 'remedy',
    component: 'Switch',
    show: false,
  },
  {
    label: '项目名称',
    field: 'projectName',
    required: false,
    component: 'Input',
    dynamicDisabled: ({}) => {
      return true;
    },
  },
  {
    label: '项目进度阶段',
    field: 'projectScheduleUsageItemId',
    required: true,
    component: 'Input',
    slot: 'remoteSearchSchedule',
    componentProps: {
      placeholder: '请选择项目进度阶段',
      onChange: (e: any) => {
        console.log(e);
      },
      dynamicDisabled: ({ values }) => {
        return !!values.id;
      },
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
    // required: true,
  },
  {
    label: '服务内容',
    field: 'serviceContent',
    component: 'InputTextArea',
  },
  {
    label: '服务时间',
    field: 'createTime',
    component: 'DatePicker',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        disabledDate: (current: Dayjs) => {
          if (!!formModel.remedy) {
            // Can not select days before today and today
            if (!current) {
              return false;
            }
            let day = current;
            if (day > dayjs().endOf('day')) {
              return true;
            }
            day = day.add(8, 'day');
            if (day < dayjs().endOf('day')) {
              return true;
            }
            return false;
          } else {
            return true;
          }
        },
      };
    },
    dynamicDisabled: ({ values }) => {
      if (!values.remedy) {
        return true;
      }
      if (values.id && values && values.createTime) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    label: '工时(天)',
    field: 'workHours',
    component: 'InputNumber',
    required: true,
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
    label: '加班时长(时)',
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

export const costColumns: BasicColumn[] = [
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
  },
  {
    title: '服务时间',
    dataIndex: 'createTime',
    width: 100,
  },
  {
    title: '工时(天)',
    dataIndex: 'workHours',
    width: 50,
  },
  {
    title: '服务内容',
    dataIndex: 'serviceContent',
    width: 200,
  },
  {
    title: '是否加班',
    dataIndex: 'overtimeFlag',
    width: 80,
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
    title: '加班时长(时)',
    dataIndex: 'overtime',
    width: 50,
  },
  {
    title: '是否完成',
    dataIndex: 'doneFlag',
    width: 80,
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
    title: '是否归档',
    dataIndex: 'archiveFlag',
    width: 80,
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
    title: '下次服务时间',
    dataIndex: 'nextPlanTime',
    width: 100,
  },
  {
    title: '下次服务内容',
    dataIndex: 'nextPlanContent',
    width: 200,
  },
];

export const searchCostFormSchema: FormSchema[] = [
  {
    label: '服务人',
    field: 'staff',
    component: 'Input',
  },
  {
    label: '服务时间',
    field: 'createTime',
    component: 'RangePicker',
    componentProps: {
      valueType: 'Date',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '服务内容',
    field: 'serviceContent',
    component: 'Input',
  },
];

export const costFormSchema: FormSchema[] = [
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
    dynamicDisabled: ({}) => {
      return true;
    },
  },
  {
    label: '项目进度阶段',
    field: 'projectScheduleUsageItemId',
    required: true,
    component: 'Input',
    slot: 'remoteSearchSchedule',
    componentProps: {
      placeholder: '请选择项目进度阶段',
      onChange: (e: any) => {
        console.log(e);
        // formModel.city = undefined; //  reset city value
        // const { updateSchema } = formActionType;
        // updateSchema({
        //   field: 'city',
        //   componentProps: {
        //     options: citiesOptions,
        //   },
        // });
      },
    },
    dynamicDisabled: ({ values }) => {
      return !!values.id;
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
    // required: true,
  },
  {
    label: '服务内容',
    field: 'serviceContent',
    component: 'InputTextArea',
  },
  {
    label: '工时(天)',
    field: 'workHours',
    component: 'InputNumber',
    required: true,
    suffix: '天',
  },
  {
    label: '是否加班',
    field: 'overtimeFlag',
    component: 'Switch',
  },
  {
    label: '加班时长(时)',
    field: 'overtime',
    component: 'InputNumber',
    ifShow: ({ values }) => {
      return values.overtimeFlag;
    },
  },
  {
    label: '是否完成',
    field: 'doneFlag',
    component: 'Switch',
  },
  {
    label: '是否归档',
    field: 'archiveFlag',
    component: 'Switch',
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
      return !values.editPlan;
    },
  },
  {
    label: '下次服务内容',
    field: 'nextPlanContent',
    component: 'InputTextArea',
    dynamicDisabled: ({ values }) => {
      return !values.editPlan;
    },
  },
];
