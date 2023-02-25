import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import dayjs, { Dayjs } from 'dayjs';

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
        if (text === '1') {
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
        if (text === '1') {
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
        if (text === '1') {
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

export const searchFormSchema: FormSchema[] = [
  {
    label: '项目名称',
    field: 'projectName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '服务人',
    field: 'staff',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const scheduleDescItems: DescItem[] = [
  {
    label: '项目名称',
    field: 'projectName',
  },
  {
    label: '条目名称',
    field: 'scheduleName',
  },
  {
    label: '服务人',
    field: 'staff',
  },
  {
    label: '服务方式',
    field: 'serviceType',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
  {
    label: '服务时间',
    field: 'createTime',
    render: (curVal, data) => {
      if (curVal) {
        return dayjs(curVal).format('YYYY-MM-DD');
      } else {
        return '-';
      }
    },
  },
  {
    label: '工时',
    field: 'workHours',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
  {
    label: '服务内容',
    field: 'serviceContent',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
  {
    label: '是否加班',
    field: 'overtimeFlag',
    render: (curVal, data) => {
      if (curVal) {
        if (curVal === '1') {
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
    label: '加班时长',
    field: 'overtime',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
  {
    label: '是否完成',
    field: 'doneFlag',
    render: (curVal, data) => {
      if (curVal) {
        if (curVal === '1') {
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
    label: '是否归档',
    field: 'archiveFlag',
    render: (curVal, data) => {
      if (curVal) {
        if (curVal === '1') {
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
    label: '下次服务时间',
    field: 'nextPlanTime',
    render: (curVal, data) => {
      if (curVal) {
        return dayjs(curVal).format('YYYY-MM-DD');
      } else {
        return '-';
      }
    },
  },
  {
    label: '下次服务内容',
    field: 'nextPlanContent',
    render: (curVal, data) => {
      if (curVal) {
        return curVal;
      } else {
        return '-';
      }
    },
  },
];

export function getBasicColumns(data): BasicColumn[] {
  const result: BasicColumn[] = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      width: 200,
      fixed: 'left',
    },
    {
      title: '服务人',
      dataIndex: 'staff',
      width: 200,
      fixed: 'left',
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      width: 200,
      fixed: 'left',
      customRender({ text }) {
        if (text) {
          return dayjs(text).format('YYYY-MM-DD');
        } else {
          return '-';
        }
      },
    },
  ];
  data.forEach((value) => {
    result.push({
      title: value.title,
      dataIndex: value.dataIndex,
      width: 200,
    });
    result.push({
      title: value.title + '备注',
      dataIndex: value.dataIndex + '_remark',
      width: 200,
    });
  });
  return result;
}
