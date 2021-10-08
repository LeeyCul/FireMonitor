export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [{ path: '/', component: '@/pages/home' }],
  },
  { path: '/404', component: '@/pages/404' },
];
