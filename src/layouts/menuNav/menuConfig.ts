export default [
  {
    name: '监测',
    path: '/',
    icon: 'icon-gailan',
    key: '',
  },
  {
    name: '预测',
    path: '/forecast',
    icon: 'icon-moxing1',
    key: 'forecast',
  },
  {
    name: '服务',
    path: '/serveReport/list',
    icon: 'icon-fenxi1',
    key: 'serve',
  },
  {
    name: '系统管理',
    path: '/system',
    icon: 'icon-tongji',
    key: 'system',
    children: [
      {
        name: '用户管理',
        path: '/user',
        key: 'user',
        icon: 'icon-fenxi1',
      },
      {
        name: '权限管理',
        path: '/power',
        key: 'power',
        icon: 'icon-fenxi1',
      },
    ],
  },
];
