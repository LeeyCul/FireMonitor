export default [
  {
    path: '/login',
    component: '@/pages/login/layout',
    routes: [{ path: '/login', component: '@/pages/login' }],
  },
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', component: '@/pages/home' },
      { path: '/monitor/detail', component: '@/pages/home/case/detailPage' },
      { path: '/forecast', component: '@/pages/forecast' },
      {
        path: '/serveReport/list',
        component: '@/pages/serveReport/reportList',
      },
      { path: '/serveReport/add', component: '@/pages/serveReport/reportAdd' },
    ],
  },
  { path: '/404', component: '@/pages/404' },
];
