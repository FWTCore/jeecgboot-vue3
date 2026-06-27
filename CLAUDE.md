# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

JeecgBoot-Vue3 是一个低代码开发平台前端，基于 Vue 3、Vite、Ant Design Vue 3、TypeScript 和 Pinia 构建。核心特性包括后端驱动的权限系统、动态路由和完整的企业级 UI 组件库。

## 开发命令

```bash
pnpm install        # 安装依赖（需要 Node 14.18+ 或 16+）
pnpm dev            # 启动开发服务器
pnpm serve          # dev 命令别名
pnpm build          # 生产环境构建
pnpm build:test     # 测试环境构建
pnpm preview        # 预览生产构建结果
pnpm lint:eslint    # 运行 ESLint 检查
pnpm type:check     # TypeScript 类型检查
pnpm test:unit      # 运行单元测试
```

## 配置说明

- **API 代理**：在 `.env.development` 中配置 `VITE_PROXY` 和 `VITE_GLOB_DOMAIN_URL`，指向后端服务地址
- **路径别名**：`/@/` 映射到 `src/`，`/#/` 映射到 `types/`

## 核心架构

### 权限系统（后端驱动模式）

权限模式设置为 `PermissionModeEnum.BACK`（见 `src/settings/projectSetting.ts`）。路由和菜单从后端动态加载：
- `src/store/modules/permission.ts` 中的 `buildRoutesAction()` 获取菜单结构
- 通过 `router.addRoute()` 动态注册路由
- 通过 `hasPermission()` hook 实现按钮级别的权限控制

### 认证流程

1. 通过 `/sys/login` API 登录
2. Token 存储在 localStorage/sessionStorage
3. 获取用户信息和权限码
4. 根据后端菜单构建动态路由
5. 路由守卫保护需要认证的路由

### HTTP 请求层

位于 `src/utils/http/axios/`：
- `defHttp` 是主要的 axios 实例
- 请求拦截器添加：`Authorization`、`X-TIMESTAMP`、`X-Sign`（MD5签名）、`X-TENANT-ID`
- 响应格式：`{ code, result, message, success }`

### 状态管理（Pinia）

核心 store 位于 `src/store/modules/`：
- **user**：Token、用户信息、角色、字典数据
- **permission**：权限码、菜单列表、路由构建
- **app**：UI 状态（主题、侧边栏、标签页）

### 路由守卫链

守卫按顺序注册（见 `src/router/guard/index.ts`）：
1. 页面追踪和加载状态
2. HTTP 请求取消
3. 滚动位置重置
4. 权限检查和路由构建
5. 状态管理

## 代码模式

### 功能模块结构

业务模块遵循统一的结构（参考 `src/views/mzx/office/components/project/`）：

```
Feature/
├── Feature.api.ts      # API 定义，使用 defHttp
├── Feature.data.ts     # 表格列配置和表单 schema
├── FeatureList.vue     # 列表页面，使用 useListPage hook
├── FeatureDrawer.vue   # 新增/编辑抽屉表单
└── FeatureDetail.vue   # 详情查看抽屉
```

### useListPage Hook

`src/hooks/system/useListPage.ts` 中的 `useListPage` 是列表页面的标准 hook：

```typescript
const { tableContext } = useListPage({
  designScope: 'feature-page',
  tableProps: {
    title: '列表标题',
    api: featureList,           // API 函数
    columns: featureColumns,    // 列定义
    formConfig: {
      schemas: searchFormSchema, // 搜索表单 schema
    },
  },
});

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;
```

提供的功能：
- 带搜索表单的表格
- 行选择功能
- 导入导出辅助方法（`onExportXls`、`onImportXls`）
- 请求辅助方法（`doRequest`、`doDeleteRecord`）

### API 定义模式

```typescript
import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/module/list',
  save = '/module/add',
  edit = '/module/edit',
  delete = '/module/delete',
}

export const listApi = (params) => defHttp.get({ url: Api.list, params });
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url, params });
};
```

### 组件导入规范

统一使用路径别名：
```typescript
import { BasicTable } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { defHttp } from '/@/utils/http/axios';
```

## 核心组件

- **BasicTable**：主要表格组件，支持搜索、分页、操作列
- **BasicForm**：基于 schema 配置的表单组件
- **BasicDrawer**：用于表单和详情的抽屉组件
- **JVxeTable**：可编辑表格，用于 ERP 风格复杂表单（位于 `src/components/jeecg/`）

## 多租户支持

租户 ID 通过 HTTP 请求头的 `X-TENANT_ID` 传递。

## Keep-Alive 缓存

路由级缓存已开启（`openKeepAlive: true`）。如需禁用特定路由的缓存，在路由 meta 中设置 `ignoreKeepAlive: true`。