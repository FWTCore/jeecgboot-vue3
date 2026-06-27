import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  overtimeList = '/overtime/record/list',
  overtimeSave = '/overtime/record/add',
  overtimeEdit = '/overtime/record/edit',
  overtimeDelete = '/overtime/record/delete',
  batchOvertimeDelete = '/overtime/record/deleteBatch',
  overtimeConfirm = '/overtime/record/confirm',
  queryProjectSchedule = '/overtime/record/queryProjectSchedule',
  allProject = '/project/queryall',
}

/**
 * 加班记录列表接口
 * @param params
 */
export const overtimeList = (params) => defHttp.get({ url: Api.overtimeList, params });

/**
 * 保存或者更新加班记录
 * @param params
 */
export const saveOrUpdateOvertime = (params, isUpdate) => {
  const url = isUpdate ? Api.overtimeEdit : Api.overtimeSave;
  return defHttp.post({ url: url, params });
};

/**
 * 删除加班记录
 */
export const deleteOvertime = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.overtimeDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 批量删除加班记录
 * @param params
 */
export const batchDeleteOvertime = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.batchOvertimeDelete, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};

/**
 * 确认加班申请
 * @param params
 */
export const confirmOvertime = (params) => defHttp.post({ url: Api.overtimeConfirm, params });

/**
 * 获取项目阶段
 * @param params
 */
export const queryProjectSchedule = (params) => defHttp.get({ url: Api.queryProjectSchedule, params });

/**
 * 获取项目
 * @param params
 */
export const getAllProject = (params) => defHttp.get({ url: Api.allProject, params });
