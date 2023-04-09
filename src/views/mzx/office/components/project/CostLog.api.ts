import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  costList = '/project/cost/list',
  addOrEdit = '/project/cost/addOrEdit',
  costDelete = '/project/cost/delete',
  batchCostDelete = '/project/cost/deleteBatch',
  allProject = '/project/queryall',
  exportXls = '/project/cost/exportXls',
}

/**
 * 项目服务日志列表接口
 * @param params
 */
export const costList = (params) => defHttp.get({ url: Api.costList, params });
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 保存或者更新项目服务日志
 * @param params
 */
export const saveOrUpdateCost = (params) => {
  return defHttp.post({ url: Api.addOrEdit, params });
};

/**
 * 删除项目服务日志
 */
export const deleteCost = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.costDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除项目服务日志
 * @param params
 */
export const batchCostDelete = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.batchCostDelete, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 获取项目
 * @param params
 */
export const getAllProject = (params) => defHttp.get({ url: Api.allProject, params });
