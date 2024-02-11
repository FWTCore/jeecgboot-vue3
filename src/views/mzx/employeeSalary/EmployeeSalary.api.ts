import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  employeeSalaryList = '/employee/salary/list',
  employeeSalaryDelete = '/employee/salary/delete',
  employeeSalaryBathDelete = '/employee/salary/bathDelete',
  duplicateCheck = '/sys/duplicate/check',
  edit = '/employee/salary/edit',
  save = '/employee/salary/add',
}

/**
 * 员工薪资管理列表接口
 * @param params
 */
export const employeeSalaryList = (params) => defHttp.get({ url: Api.employeeSalaryList, params });

/**
 * 删除员工薪资
 */
export const employeeSalaryDelete = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.employeeSalaryDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 批量删除员工薪资
 * @param params
 */
export const employeeSalaryBathDelete = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.employeeSalaryBathDelete, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 唯一校验
 * @param params
 */
export const duplicateCheck = (params) => defHttp.get({ url: Api.duplicateCheck, params }, { isTransformResponse: false });

/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
