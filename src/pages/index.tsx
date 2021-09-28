import React from 'react';
import styles from './index.less';
import { Button, Input, Table } from 'antd';
import { useFullScreen } from '@/common/hooks';
import '@/common/utils/postPxToRem';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号1122212',
  },
  {
    key: '2',
    name: '胡彦祖11',
    age: 42,
    address: '西湖区湖底公园1号111122',
  },
];

const columns = [
  {
    title: '姓名11',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄11',
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
  return (
    <>
      <div className={styles.view} onClick={() => useFullScreen()}>
        <Button type="primary" size="large">
          你好
        </Button>
        <div className={styles.Box}>1111</div>
        <div className={styles.Box}></div>
        <div className={styles.Box}></div>
      </div>
      <Button type="primary" size="large">
        你好
      </Button>
      <Input size="large" placeholder="large size" />

      <Table dataSource={dataSource} columns={columns} />
    </>
  );
}
export default IndexPage;
