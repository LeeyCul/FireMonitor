import React from 'react';
import { Button, Table, Divider } from 'antd';
import { Link } from 'umi';
import { ColumnsType } from 'antd/lib/table';
import Page from '@/common/components/Page';
import { Links } from '@/common/constant';
import styles from './style.less';

function index() {
  const columns = [
    {
      title: '报告名称',
      dataIndex: 'name',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '期数',
      dataIndex: 'age',
      align: 'center',
    },
    {
      title: '报告类型',
      dataIndex: 'addres1s',
      align: 'center',
    },
    {
      title: '签发人',
      dataIndex: 'a1ge',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'addr12ess',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'addr2ess',
      align: 'center',
      render: () => (
        <div>
          <Button type="primary">编辑</Button>
          <Divider type="vertical" />
          <Button type="primary" danger>
            删除
          </Button>
        </div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
  };
  return (
    <Page>
      <div className={styles.conainerView}>
        <div className={styles.titleView}>
          <Link to={Links.ServeReportAdd}>
            <Button type="primary">新建</Button>
          </Link>
          <Button className={styles.btnStyle}>下载</Button>
        </div>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          pagination={{ position: ['bottomCenter'] }}
          columns={columns as ColumnsType<any>}
          dataSource={[
            {
              key: '1',
              name: 'John Brown111111111111111111111111',
              age: 32,
              address: 'New York No. 1 Lake Park',
            },
            {
              key: '2',
              name: 'Jim Green',
              age: 42,
              address: 'London No. 1 Lake Park',
            },
          ]}
        />
      </div>
    </Page>
  );
}

export default index;
