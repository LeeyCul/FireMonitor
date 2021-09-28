import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from 'react/jsx-runtime';
import { Button, Input, Table } from 'antd';
import styles from './index.less';
import { useFullScreen } from '@/common/hooks';
import '@/common/utils/postPxToRem';
const dataSource = [
  {
    key: '1',
    name: '胡彦斌1',
    age: 32,
    address: '西湖区湖底公园1号1122212',
  },
  {
    key: '2',
    name: '胡彦祖1111',
    age: 42,
    address: '西湖区湖底公园1号1111221',
  },
];
const columns = [
  {
    title: '姓名11',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄112',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];
function IndexPage() {
  return _jsxs(
    _Fragment,
    {
      children: [
        _jsxs(
          'div',
          Object.assign(
            { className: styles.view, onClick: () => useFullScreen() },
            {
              children: [
                _jsx(
                  Button,
                  Object.assign(
                    { type: 'primary', size: 'large' },
                    { children: '\u4F60\u597D' },
                  ),
                  void 0,
                ),
                _jsx(
                  'div',
                  Object.assign(
                    { className: styles.Box },
                    { children: '1111' },
                  ),
                  void 0,
                ),
                _jsx('div', { className: styles.Box }, void 0),
                _jsx('div', { className: styles.Box }, void 0),
              ],
            },
          ),
          void 0,
        ),
        _jsx(
          Button,
          Object.assign(
            { type: 'primary', size: 'large' },
            { children: '\u4F60\u597D' },
          ),
          void 0,
        ),
        _jsx(Input, { size: 'large', placeholder: 'large size' }, void 0),
        _jsx(Table, { dataSource: dataSource, columns: columns }, void 0),
      ],
    },
    void 0,
  );
}
export default IndexPage;
//# sourceMappingURL=index.js.map
