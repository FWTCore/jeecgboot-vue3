import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/project/billing/list',
  detailList = '/project/billing/detailList',
  participantsList = '/project/billing/getParticipants',
  save = '/project/billing/save',
  audit = '/project/billing/audit',
  batchPaymentData = '/project/billing/batchPaymentData',
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
 * 列表接口
 * @param params
 */
export const participantsList = (params) => defHttp.get({ url: Api.participantsList, params });
/**
 * 保存
 * @param params
 */
export const saveProjectBilling = (params, handleSuccess) => {
  return defHttp.post({ url: Api.save, params }).then(() => {
    handleSuccess();
  });
};

export const auditData = (params, handleSuccess) => {
  Modal.confirm({
    title: '审批确认',
    content: '是否审批通过',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.post({ url: Api.audit, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};

export const batchPaymentData = (params, handleSuccess) => {
  Modal.confirm({
    title: '项目提成发放确认',
    content: '是否发放项目提成',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.post({ url: Api.batchPaymentData, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
