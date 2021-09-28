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
  chainWebpack: function () {},
  dynamicImport: {
    loading: '@/common/components/Loading',
  },
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 100,
      propList: ['*'],
    }),
  ],
});
//# sourceMappingURL=config.js.map
