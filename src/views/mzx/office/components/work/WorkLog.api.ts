import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  workLogList = '/worklog/list',
  workLogSave = '/worklog/add',
  workLogEdit = '/worklog/edit',
  workLogDelete = '/worklog/delete',
  batchWorkLogDelete = '/worklog/deleteBatch',
}

/**
 * 日常日志列表接口
 * @param params
 */
export const workLogList = (params) => defHttp.get({ url: Api.workLogList, params });

/**
 * 保存或者更新日常日志
 * @param params
 */
export const saveOrUpdateWorkLog = (params, isUpdate) => {
  const url = isUpdate ? Api.workLogEdit : Api.workLogSave;
  return defHttp.post({ url: url, params });
};

/**
 * 删除日常日志
 */
export const deleteWorkLog = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.workLogDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除日常日志
 * @param params
 */
export const batchWorkLogDelete = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.batchWorkLogDelete, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
