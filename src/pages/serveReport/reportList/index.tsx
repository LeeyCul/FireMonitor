import React from 'react';
import { Button, Divider } from 'antd';
import { Link } from 'umi';
import Page from '@/common/components/Page';
import CustomTable from '@/common/components/CustomTable';
import Iconfont from '@/common/components/IconFont';
import Query from './Query';
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
  const PageTitle = () => (
    <div className={styles.pageTitleView}>
      <div>专题报告</div>
      <div>
        <Link to={Links.ServeReportAdd}>
          <Button type="primary" icon={<Iconfont type="iconadd" size={14} />}>
            新建
          </Button>
        </Link>
        &emsp;
        <Button icon={<Iconfont type="iconlayout" size={14} />}>下载</Button>
      </div>
    </div>
  );
  return (
    <Page clsName={styles.conainerView}>
      <Query />
      <hr className={styles.line} />
      <Page
        icon="iconimage-text"
        title={<PageTitle />}
        style={{ paddingLeft: 0, margin: 0 }}
      >
        <CustomTable
          columns={columns}
          dataSource={[]}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
        />
      </Page>
    </Page>
  );
}

export default index;
