import { defHttp } from '/@/utils/http/axios';

enum Api {
  // 统计列表
  statisticsList = '/employee/leave/statistics/list',
  // 调休记录
  recordList = '/employee/leave/list',
  recordAdd = '/employee/leave/add',
  recordDelete = '/employee/leave/delete',
  // 加班记录（复用加班管理模块）
  overtimeList = '/overtime/record/list',
  overtimeConfirm = '/overtime/record/confirm',
  // 员工薪资（用于获取员工调休统计）
  employeeLeaveStats = '/employee/leave/stats',
}

/**
 * 员工调休统计列表
 * @param params
 */
export const getStatisticsList = (params) => defHttp.get({ url: Api.statisticsList, params });

/**
 * 调休记录列表
 * @param params
 */
export const getLeaveRecordList = (params) => defHttp.get({ url: Api.recordList, params });

/**
 * 新增调休记录
 * @param params
 */
export const addLeaveRecord = (params) => defHttp.post({ url: Api.recordAdd, params });

/**
 * 删除调休记录
 * @param params
 * @param handleSuccess
 */
export const deleteLeaveRecord = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.recordDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 加班记录列表（复用加班管理模块）
 * @param params
 */
export const getOvertimeList = (params) => defHttp.get({ url: Api.overtimeList, params });

/**
 * 确认加班记录
 * @param params
 */
export const confirmOvertime = (params) => defHttp.post({ url: Api.overtimeConfirm, params });

/**
 * 获取员工调休统计信息（用于录入时显示剩余调休）
 * @param params
 */
export const getEmployeeLeaveStats = (params) => defHttp.get({ url: Api.employeeLeaveStats, params });
