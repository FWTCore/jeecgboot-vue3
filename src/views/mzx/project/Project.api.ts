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
  getScheduleTemplate = '/project/schedule/queryByProjectId',
  memberList = '/project/member/list',
  deleteMember = '/project/member/delete',
  editMember = '/project/member/edit',
  saveMember = '/project/member/add',
  listSchedule = '/project/schedule/scheduleLoglist',
  saveSchedule = '/project/schedule/add',
  editSchedule = '/project/schedule/edit',
  deleteSchedule = '/project/schedule/edit',
  allUsageSchedule = '/project/schedule/queryusageschedule',
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
 * 获取项目模板
 * @param params
 */
export const getScheduleTemplate = (params) => defHttp.get({ url: Api.getScheduleTemplate, params });

/**
 * 成员列表接口
 * @param params
 */
export const memberList = (params) => defHttp.get({ url: Api.memberList, params });
/**
 * 删除
 */
export const deleteMember = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteMember, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdateMember = (params, isUpdate) => {
  const url = isUpdate ? Api.editMember : Api.saveMember;
  return defHttp.post({ url: url, params });
};

/**
 * 成员列表接口
 * @param params
 */
export const listSchedule = (params) => defHttp.get({ url: Api.listSchedule, params });
/**
 * 删除
 */
export const deleteSchedule = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteSchedule, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdateSchedule = (params, isUpdate) => {
  const url = isUpdate ? Api.editSchedule : Api.saveSchedule;
  return defHttp.post({ url: url, params });
};
/**
 * 获取项目阶段
 * @param params
 */
export const getAllUsageSchedule = (params) => defHttp.get({ url: Api.allUsageSchedule, params });
