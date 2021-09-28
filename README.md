# 森林防火预警系统

## 说明

本项目为大屏展示项目，因此对各个尺寸的屏幕需要做到兼容处理，就本次需求选择了一个方案去适配；
本方案使用的pxtorem，同时监听窗口大小，改变本目录文字大小（详细见utils/postPxToRem),因
次在书写的时候无需过多考虑，都会对单位进行处理。

项目脚手架使用umi+dva这一套组合，因此Requst业务尽量放置在models内,尽量减少TSX中内容，原
则上单页面不超过200行，以方便后期维护。

## 启动

安装依赖

```bash
$ yarn
```

启动服务

```bash
$ yarn start
```

打包服务
```
$ yarn build
```
## 目录结构

```
├── mock
├── dist
├── config 配置文件
└── src
    ├── common           公共业务
    │   ├── hooks        自定义hooks存放
    │   ├── utils        工具业务文件
    │   ├── constant     存放常量内容
    │   ├── assets       存放静态资源如图片等
    │   ├── api          api接口存放地方
    │   └── components   公共组件
    │    └── Loading
    ├── pages            业务组件
    │   └── home
    └── models           数据状态存放
```
