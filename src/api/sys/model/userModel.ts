/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  loginName: string;
  password: string;
}

export interface ThirdLoginParams {
  token: string;
  thirdType: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  token: string;
  loginId: string | number;
  loginName: string;
  realName: string;
  telephone: string;
  avatar: string;
  workNumber: string;
  sex: number;
  sexText: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realname: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
  // 用户信息
  userInfo?: any;
  // 缓存字典项
  sysAllDictItems?: any;
}

/**
 * @description: Get user information return value
 */
export interface GetResultModel {
  code: number;
  message: string;
  result: object;
  success: Boolean;
}
