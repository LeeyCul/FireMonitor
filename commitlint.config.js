/**
 * feat： 增加新功能
 * perf：性能优化
 * fix：Bug 修复
 * revert：撤销
 * docs: 文档
 * style：仅样式改动
 * refactor：重构
 * chore：比较零碎的变动
 * ci： 持续集成脚本（example scopes: travis, circle, browser-stack, sauce-labs）
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'perf',
        'fix',
        'revert',
        'docs',
        'style',
        'refactor',
        'chore',
        'ci',
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
};
