import React, { useState } from 'react';
import { Button, Divider } from 'antd';
import { useRequest } from 'ahooks';
import { Link } from 'umi';
import Page from '@/common/components/Page';
import CustomTable from '@/common/components/CustomTable';
import Iconfont from '@/common/components/IconFont';
import Query from './Query';
import { Links } from '@/common/constant';
import styles from './style.less';
import { getReportList, getDelete } from '@/common/api';

function index() {
  const columns = [
    {
      title: '报告名称',
      dataIndex: 'title',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '期数',
      dataIndex: 'number',
      align: 'center',
    },
    {
      title: '报告类型',
      dataIndex: 'area',
      align: 'center',
    },
    {
      title: '签发人',
      dataIndex: 'creator',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'id',
      align: 'center',
      render: (id: string) => (
        <div>
          <Button type="primary">编辑</Button>
          <Divider type="vertical" />
          <Button type="primary" danger onClick={() => delRun({ ids: [id] })}>
            删除
          </Button>
        </div>
      ),
    },
  ];

  // const [selectedRowKeys, setselectedRowKeys] = useState<Array<string | number>>([]);

  const { data, run, loading } = useRequest(getReportList, {
    formatResult: (res: any) => res?.data,
  });
  const { run: delRun, loading: delLoding } = useRequest(getDelete, {
    manual: true,
  });
  const { records } = data || {};
  console.log('data', data);
  // const rowSelection = {
  //   onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
  //     setselectedRowKeys(selectedRowKeys);
  //   },
  // };
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
          loading={loading}
          columns={columns}
          rowKey="id"
          dataSource={records && [...records, { id: 2 }]}
          // rowSelection={{
          //   type: 'checkbox',
          //   ...rowSelection,
          // }}
        />
      </Page>
    </Page>
  );
}

export default index;
