import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';
enum Api {
  list = '/project/schedule/template/list',
  save = '/project/schedule/template/add',
  edit = '/project/schedule/template/edit',
  duplicateCheck = '/sys/duplicate/check',
  deleteData = '/project/schedule/template/delete',
  deleteBatch = '/project/schedule/template/deleteBatch',
  importExcel = '/sys/dict/importExcel',
  exportXls = '/sys/dict/exportXls',
  recycleBinList = '/sys/dict/deleteList',
  putRecycleBin = '/sys/dict/back',
  deleteRecycleBin = '/sys/dict/deletePhysic',
  itemList = '/project/schedule/item/template/list',
  deleteItem = '/project/schedule/item/template/delete',
  deleteBatchItem = '/project/schedule/item/template/deleteBatch',
  itemSave = '/project/schedule/item/template/add',
  itemEdit = '/project/schedule/item/template/edit',
  dictItemCheck = '/sys/dictItem/dictItemCheck',
  refreshCache = '/sys/dict/refleshCache',
  queryAllDictItems = '/sys/dict/queryAllDictItems',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 * @param params
 */
export const getImportUrl = Api.importExcel;
/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
/**
 * 删除
 */
export const deleteData = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteData, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除
 * @param params
 */
export const batchDeleteData = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdateDict = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
/**
 * 唯一校验
 * @param params
 */
export const duplicateCheck = (params) => defHttp.get({ url: Api.duplicateCheck, params }, { isTransformResponse: false });
/**
 * 回收站列表
 * @param params
 */
export const getRecycleBinList = (params) => defHttp.get({ url: Api.recycleBinList, params });
/**
 * 回收站还原
 * @param params
 */
export const putRecycleBin = (id, handleSuccess) => {
  return defHttp.put({ url: Api.putRecycleBin + `/${id}` }).then(() => {
    handleSuccess();
  });
};
/**
 * 回收站删除
 * @param params
 */
export const deleteRecycleBin = (id, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteRecycleBin + `/${id}` }).then(() => {
    handleSuccess();
  });
};
/**
 *  阶段/明细列表
 * @param params
 */
export const itemList = (params) => defHttp.get({ url: Api.itemList, params });
/**
 *  阶段/明细删除
 * @param params
 */
export const deleteItem = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteItem, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 *  阶段/明细批量删除
 * @param params
 */
export const deleteBatchItem = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteBatchItem, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdateItem = (params, isUpdate) => {
  let url = isUpdate ? Api.itemEdit : Api.itemSave;
  return defHttp.post({ url: url, params });
};
/**
 * 校验数据值
 * @param params
 */
export const dictItemCheck = (params) => defHttp.get({ url: Api.dictItemCheck, params }, { isTransformResponse: false });
/**
 * 刷新
 * @param params
 */
export const refreshCache = () => defHttp.get({ url: Api.refreshCache }, { isTransformResponse: false });
/**
 * 获取所有项
 * @param params
 */
export const queryAllDictItems = () => defHttp.get({ url: Api.queryAllDictItems }, { isTransformResponse: false });
