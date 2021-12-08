import { defineConfig } from 'umi';
import routes from './route';

const pxtorem = require('postcss-pxtorem');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
    hmr: true,
  },
  locale: { antd: true },
  routes,
  fastRefresh: {},
  chainWebpack() {},
  dynamicImport: {
    loading: '@/common/components/Loading',
  },
  proxy: {
    '/api': {
      target: 'http://iot.feelbang.com:8088',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  // extraPostCSSPlugins: [
  //   pxtorem({
  //     rootValue: 100,
  //     propList: ['*'],
  //   }),
  // ],
});
