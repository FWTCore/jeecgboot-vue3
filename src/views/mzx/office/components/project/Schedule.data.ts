import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import dayjs from 'dayjs';

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
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
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
    title: '工时',
    dataIndex: 'workHours',
    width: 50,
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
  {
    title: '服务内容',
    dataIndex: 'serviceContent',
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
    title: '是否加班',
    dataIndex: 'overtimeFlag',
    width: 80,
    customRender({ text }) {
      if (text) {
        if (text === '1'){
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
    title: '加班时长',
    dataIndex: 'overtime',
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
    title: '是否完成',
    dataIndex: 'doneFlag',
    width: 80,
    customRender({ text }) {
      if (text) {
        if (text === '1'){
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
        if (text === '1'){
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
    width: 120,
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
    customRender({ text }) {
      if (text) {
        return text;
      } else {
        return '-';
      }
    },
  },
];

export const searchScheduleFormSchema: FormSchema[] = [
  {
    label: '项目名称',
    field: 'projectName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '条目名称',
    field: 'scheduleName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '服务人',
    field: 'staff',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '服务时间',
    field: 'createTime',
    component: 'RangePicker',
    colProps: { span: 6 },
    componentProps: {
      valueType: 'Date',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
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
    label: '服务内容',
    field: 'serviceContent',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '是否加班',
    field: 'overtimeFlag',
    component: 'Switch',
    colProps: { span: 6 },
  },
  {
    label: '是否完成',
    field: 'doneFlag',
    component: 'Switch',
    colProps: { span: 6 },
  },
  {
    label: '是否归档',
    field: 'archiveFlag',
    component: 'Switch',
    colProps: { span: 6 },
  },
];
