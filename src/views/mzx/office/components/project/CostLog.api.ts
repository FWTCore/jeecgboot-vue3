import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  costList = '/project/cost/list',
  costSave = '/project/cost/add',
  costEdit = '/project/cost/edit',
  costDelete = '/project/cost/delete',
  batchCostDelete = '/project/cost/delete',
}

/**
 * 项目服务日志列表接口
 * @param params
 */
export const costList = (params) => defHttp.get({ url: Api.costList, params });

/**
 * 保存或者更新项目服务日志
 * @param params
 */
export const saveOrUpdateCost = (params, isUpdate) => {
  const url = isUpdate ? Api.costEdit : Api.costSave;
  return defHttp.post({ url: url, params });
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
