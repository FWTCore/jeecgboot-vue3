import { defHttp } from '/@/utils/http/axios';
enum Api {
  list = '/customer/list',
  syncuft = '/customer/syncUFT',
  edit = '/customer/edit',
  save = '/customer/save',
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
export const saveOrUpdateDict = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
