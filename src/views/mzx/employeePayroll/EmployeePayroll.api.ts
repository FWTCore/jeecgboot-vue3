import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  employeePayrollList = '/employee/payroll/list',
  employeePayrollDelete = '/employee/payroll/delete',
  employeePayrollBathDelete = '/employee/payroll/bathDelete',
  employeePayrollEffect = '/employee/payroll/effect',
  employeePayrollBathEffect = '/employee/payroll/bathEffect',
  duplicateCheck = '/employee/payroll/check',
  edit = '/employee/payroll/edit',
  save = '/employee/payroll/add',
  exportXls = '/employee/payroll/exportXls',
}

/**
 * 员工工资管理列表接口
 * @param params
 */
export const employeePayrollList = (params) => defHttp.get({ url: Api.employeePayrollList, params });

/**
 * 删除员工薪资
 */
export const employeePayrollDelete = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.employeePayrollDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 批量删除员工薪资
 * @param params
 */
export const employeePayrollBathDelete = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.employeePayrollBathDelete, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};

/**
 * 删除员工薪资
 */
export const employeePayrollEffect = (params, handleSuccess) => {
  return defHttp.post({ url: Api.employeePayrollEffect, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 批量删除员工薪资
 * @param params
 */
export const employeePayrollBathEffect = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认生效',
    content: '是否生效选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.post({ url: Api.employeePayrollBathEffect, data: params }, { joinParamsToUrl: true }).then(() => {
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
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
