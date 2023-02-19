import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  customerList = '/customer/service/list',
  customerSave = '/customer/service/add',
  customerEdit = '/customer/service/edit',
  customerDelete = '/customer/service/delete',
  batchCustomerDelete = '/customer/service/deleteBatch',
  allCustomerList = '/customer/queryall',
}

/**
 * 客户服务列表接口
 * @param params
 */
export const customerList = (params) => defHttp.get({ url: Api.customerList, params });

/**
 * 保存或者更新客户服务
 * @param params
 */
export const saveOrUpdateCustomer = (params, isUpdate) => {
  const url = isUpdate ? Api.customerEdit : Api.customerSave;
  return defHttp.post({ url: url, params });
};

/**
 * 删除客户服务
 */
export const deleteCustomer = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.customerDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除日常日志
 * @param params
 */
export const batchWorkLogDelete = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.batchCustomerDelete, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 获取全部客户
 * @param params
 */
export const getAllCustomerList = (params) => defHttp.get({ url: Api.allCustomerList, params });