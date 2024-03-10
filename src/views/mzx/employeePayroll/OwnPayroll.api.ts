import { defHttp } from '/@/utils/http/axios';

enum Api {
  ownPayrollList = '/employee/payroll/ownList',
  detailList = '/project/billing/ownDetailList',
}

/**
 * 员工工资管理列表接口
 * @param params
 */
export const ownPayrollList = (params) => defHttp.get({ url: Api.ownPayrollList, params });

/**
 * 列表接口
 * @param params
 */
export const detailList = (params) => defHttp.get({ url: Api.detailList, params });
