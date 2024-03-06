import { defHttp } from '/@/utils/http/axios';
enum Api {
  list = '/project/billing/list',
  detailList = '/project/cost/calculate/detailList',
}
/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
/**
 * 列表接口
 * @param params
 */
export const detailList = (params) => defHttp.get({ url: Api.detailList, params });
/**
 * 删除
 */
export const batchPaymentData = (params, handleSuccess) => {
  return null;
};
export const auditData = (params, handleSuccess) => {
  return null;
};
