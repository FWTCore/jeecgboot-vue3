import { defHttp } from '/@/utils/http/axios';
enum Api {
  list = '/project/cost/calculate/list',
  detailList = '/project/cost/calculate/detailList',
  exportXls = '/project/cost/calculate/exportXls',
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
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
