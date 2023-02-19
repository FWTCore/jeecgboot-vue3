import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  scheduleList = '/project/schedule/scheduleLoglist',
  scheduleSave = '/project/schedule/add',
  scheduleEdit = '/project/schedule/edit',
  scheduleDelete = '/project/schedule/delete',
  batchScheduleDelete = '/project/schedule/delete',
}

/**
 * 项目服务日志列表接口
 * @param params
 */
export const scheduleList = (params) => defHttp.get({ url: Api.scheduleList, params });

/**
 * 保存或者更新项目服务日志
 * @param params
 */
export const saveOrUpdateSchedule = (params, isUpdate) => {
  const url = isUpdate ? Api.scheduleEdit : Api.scheduleSave;
  return defHttp.post({ url: url, params });
};

/**
 * 删除项目服务日志
 */
export const deleteSchedule = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.scheduleDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除项目服务日志
 * @param params
 */
export const batchScheduleDelete = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.batchScheduleDelete, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
