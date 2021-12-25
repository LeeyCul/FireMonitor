import React, { useState } from 'react';
import { Button, Divider, message } from 'antd';
import { history, Link } from 'umi';
import { useRequest } from 'ahooks';
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
          <Button
            type="primary"
            onClick={() => history.push(Links.ServeReportAdd)}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button type="primary" danger onClick={() => delRun([id])}>
            删除
          </Button>
        </div>
      ),
    },
  ];

  // const [selectedRowKeys, setselectedRowKeys] = useState<Array<string | number>>([]);
  const [query, setQuery] = useState<any>({});
  const { data, run, loading } = useRequest(getReportList, {
    formatResult: (res) => res?.data,
  });
  const { run: delRun, loading: delLoding } = useRequest(getDelete, {
    formatResult: (res) => res?.data,
    manual: true,
  });
  const { records, total } = data || {};
  const changePage = (current: number, size?: number) => {
    run({ size, current, ...query });
  };
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
        <Button
          icon={<Iconfont type="iconlayout" size={14} />}
          onClick={() => message.info('功能待开发')}
        >
          下载
        </Button>
      </div>
    </div>
  );

  return (
    <Page clsName={styles.conainerView}>
      <Query
        onResetFields={() => run()}
        onchange={(value) => {
          setQuery(value);
          run(value);
        }}
      />
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
          dataSource={records && [...records]}
          pagination={{
            showSizeChanger: true,
            total,
            onChange: changePage,
          }}
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
