import React from 'react';
import { Button, Divider } from 'antd';
import CustomTable from '@/common/components/customTable';
import Page from '@/common/components/Page';
import styles from './style.less';

function index() {
  const columns = [
    {
      title: '报告名称',
      dataIndex: 'name',
      align: 'center',
      // ellipsis: true,
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
  let data = [];
  for (let i = 0; i < 100; i++) {
    data.push({ name: i, key: i });
  }

  return (
    <>
      <Page clsName={styles.dataQueryView}>
        111
        <hr className={styles.line} />
        <Page
          icon="iconsousuojieguo"
          title={
            <div>
              查询结果
              <span className={styles.updateTime}>更新于2021-11-12 12:00</span>
            </div>
          }
          style={{ paddingLeft: 0, margin: 0 }}
        >
          <CustomTable
            clsName={styles.tableView}
            columns={columns}
            dataSource={data}
          />
        </Page>
      </Page>
    </>
  );
}

export default index;
