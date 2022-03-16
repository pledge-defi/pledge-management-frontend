最高权限账户： 0xb298CDbDb6E6149f9DD797E9901C0168B4ae2407  
私钥 ： b21f0aebc1cd66e15fac63991d297b1b2d2370893cbbc321058573c89d2a6215

多签账户一：账户：0x481a65e50522602f6f920E6b797Df85b6182f948 私钥：c12231347286afd6bafa8b5c61ee997f115b7fadc78373ab66d9df790e791ab3 多签账户二：账户：0x03fb15c1Bbe875f3869D7b5EAAEB31111deA876F 私钥：ba76d5623585431c2ee9aae544f353cf659e256aa66fd94fcafd71360a4c73dd 多签账户三：账户：0x3B720fBacd602bccd65F82c20F8ECD5Bbb295c0a  
私钥：b1d04ccad7e75e2198eddc2dc551dac46d65f6df4033d1f706c0f431eabea40f

最低权限部署账户：账户：0xf06A2fb131CBf7c3b9797Ae851EBC22B3362622B 私钥：68bfa5083ba8db42fdfe82dc791570ae12a1c57ab98679a52d6ba58ec45cad64

# Pledge management

### 项目 rope 地址

- https://github.com/pledge-defi/pledge-management-frontend

### 环境启动准备

```bash
yarn
```

```bash
yarn start
```

### 项目规范

- 一般的除了 React 组件 和 TS 类型使用大驼峰命名, 静态变量使用大写加下划线形式, 其他包括不限于(方法、文件名、变量命名)等都采用小驼峰命名,
- 项目采用了 `eslint`、`stylelint`、`prettier` 进行规范校验, [参考 umijs/fabric](https://github.com/umijs/fabric)
- 开启了 lint-staged,在每次 commit 时校验。
- `不要跳过lint-staged 检查`, `不要使用 --no-verify`

### 项目采用 TypeScript

- 尽可能的减少使用`any`, 写清楚具体的数据类型
- 尽可能的减少使用 `// @ts-ignore`, 跳过 ts 检查

### 项目技术架构

- React + TypeScript + Less + styled-componets + recoil
- 采用 umi 脚手架搭建, UI 库是 Ant-Design

### 项目接口字段调试方法

- 后端提供 swagger.json 文件, 使用转化工具 [@umijs/openapi](https://www.npmjs.com/package/@umijs/openapi)
- `yarn run openapi` 自动转化后的接口 Request、类型声明文件.d.ts、mock 文件

- 合约提供 abi.json 文件， 使用转化工具 `child_process`
- `yarn run web3-token-abi` 自动转化后的接口 类型声明文件.d.ts 文件

### 项目打包

- 打包 `yarn run build`
