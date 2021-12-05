import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import CustomTable from '@/common/components/CustomTable';
import Page from '@/common/components/Page';
import Query from './Query';
import styles from './style.less';
import Detail from './Detail';

function index() {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const dispatch = useDispatch();
  const { caseList } = useSelector((state: any) => state.detection);
  const columns = [
    {
      title: '案例名称',
      dataIndex: 'title',
      isShow: true,
    },
    {
      title: '案例介绍',
      dataIndex: 'description',
      isShow: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      isShow: true,
    },
    {
      title: '创建人',
      dataIndex: 'time',
      isShow: true,
    },
    {
      title: '操作',
      dataIndex: 'x',
      width: '200px',
      render: () => [
        <Button
          type="primary"
          ghost
          key="show"
          style={{ marginRight: 10 }}
          size="small"
        >
          查看
        </Button>,
        <Button
          type="primary"
          ghost
          key="edit"
          style={{ marginRight: 10 }}
          size="small"
        >
          编辑
        </Button>,
        <Button
          type="primary"
          ghost
          danger
          key="del"
          style={{ marginRight: 10 }}
          size="small"
        >
          删除
        </Button>,
      ],
    },
  ];

  let data = [];
  for (let i = 0; i < 100; i++) {
    data.push({ name: i, key: i });
  }

  const changeTable = (selectedRowKeys: React.Key[], selectedRows: any[]) => {
    setSelectedRows(selectedRows);
  };

  useEffect(() => {
    dispatch({
      type: 'detection/getCaseList',
      // size current name createdAt
      payload: {},
    });
  }, []);

  const MultipleExtendNode = () => (
    <div className={styles.extendNodeView}>
      <span className={styles.selectView}>
        已选择
        <span className={styles.num}>{selectedRows?.length}</span>
        项目
      </span>
      <Button ghost danger size="small" style={{ marginLeft: 50 }}>
        批量删除
      </Button>
    </div>
  );

  return (
    <>
      <Page clsName={styles.dataQueryView}>
        <Query />
        <hr className={styles.line} />
        <Page style={{ paddingLeft: 0, margin: 0 }}>
          <Button type="primary" icon={<PlusOutlined />}>
            新建档案
          </Button>
          <CustomTable
            clsName={styles.tableView}
            columns={columns}
            dataSource={caseList}
            rowSelection={{
              type: 'checkbox',
              onChange: changeTable,
            }}
            showAlert={!!selectedRows?.length}
            multipleExtendNode={<MultipleExtendNode />}
          />
        </Page>
        <Detail />
      </Page>
    </>
  );
}

export default index;
