import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/customer/list',
  syncuft = '/customer/syncuft',
  edit = '/customer/edit',
  save = '/customer/save',
  serviceList = '/customer/service/list',
  serviceEdit = '/customer/service/edit',
  serviceSave = '/customer/service/add',
  serviceDelete = '/customer/service/delete',
  serviceDeleteBatch = '/customer/service/deleteBatch',
}

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
/**
 * 同步
 * @param params
 */
export const syncuft = () => defHttp.put({ url: Api.syncuft });
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};

/**
 * 服务列表接口
 * @param params
 */
export const serviceList = (params) => defHttp.get({ url: Api.serviceList, params });
/**
 * 保存或者更新服务
 * @param params
 */
export const saveOrUpdateService = (params, isUpdate) => {
  const url = isUpdate ? Api.serviceEdit : Api.serviceSave;
  return defHttp.post({ url: url, params });
};
/**
 * 删除
 */
export const serviceDelete = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.serviceDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除
 * @param params
 */
export const serviceDeleteBatch = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.serviceDeleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
