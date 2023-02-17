import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';
enum Api {
  list = '/project/list',
  save = '/project/add',
  edit = '/project/edit',
  deleteData = '/project/delete',
  deleteBatch = '/project/deleteBatch',
  duplicateCheck = '/sys/duplicate/check',
  allCustomerList = '/customer/queryall',
  allScheduleTemplateList = '/project/schedule/template/queryall',
  allUserList = '/project/queryuserall',
}
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
export const saveOrUpdateProject = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
/**
 * 唯一校验
 * @param params
 */
export const duplicateCheck = (params) => defHttp.get({ url: Api.duplicateCheck, params }, { isTransformResponse: false });
/**
 * 获取全部客户
 * @param params
 */
export const getAllCustomerList = (params) => defHttp.get({ url: Api.allCustomerList, params });
/**
 * 获取全部项目模板
 * @param params
 */
export const getAllScheduleTemplateList = (params) => defHttp.get({ url: Api.allScheduleTemplateList, params });
/**
 * 获取全部项目模板
 * @param params
 */
export const getAllUserList = (params) => defHttp.get({ url: Api.allUserList, params });
