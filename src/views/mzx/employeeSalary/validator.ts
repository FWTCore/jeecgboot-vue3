import { dateUtil } from '/@/utils/dateUtil';
import { duplicateCheck } from './EmployeeSalary.api';

export const rules = {
  duplicateCheckProject(tableName, fieldName, model, schema, required?) {
    return [
      {
        validator: (_, value) => {
          if (!value && required) {
            return Promise.reject(`请输入${schema.label}`);
          }
          return new Promise<void>((resolve, reject) => {
            duplicateCheck({
              tableName,
              fieldName,
              fieldVal: value,
              dataId: model.id,
            })
              .then((res) => {
                res.success ? resolve() : reject(res.message || '校验失败');
              })
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ] as ArrayRule;
  },
};
