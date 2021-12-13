import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector, useRequest, history } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import CustomTable from '@/common/components/CustomTable';
import Page from '@/common/components/Page';
import Query from './Query';
import styles from './style.less';
import Modal from './Modal';
import { deleteCase } from '@/common/api';
import Detail from './Detail';

function index() {
  const queryParams = useRef<any>({});
  const pagination = useRef<{ current: number; size: number }>({
    current: 1,
    size: 10,
  });
  const [selectedRowKeys, setSelectedRows] = useState<any[]>([]);
  const [show, setShow] = useState<boolean>(false); // 是否显示详情页面
  const [visible, setVisible] = useState<boolean>(false); //  是否显示新建弹窗
  const [id, setId] = useState<number | null>(null); // 详情id
  const dispatch = useDispatch();
  const { caseList, loading } = useSelector((state: any) => state.detection);
  const { records, total } = caseList;
  const { run: deleteCaseRequest, loading: deleteLoading } = useRequest(
    deleteCase,
    {
      manual: true,
    },
  );
  const handleShowDetail = useCallback((id) => {
    history.push('/monitor/detail');
    setShow(true);
    setId(id);
  }, []);
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
      render: (_: null, row: any) => [
        <Button
          type="primary"
          ghost
          key="show"
          style={{ marginRight: 10 }}
          size="small"
          onClick={handleShowDetail.bind(null, row.id)}
        >
          查看
        </Button>,
        <Button
          type="primary"
          ghost
          key="edit"
          style={{ marginRight: 10 }}
          size="small"
          // onClick={handleShowDetail}
          onClick={() => {
            setId(row.id);
            setVisible(true);
          }}
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
          onClick={handleDelete.bind(null, row.id)}
        >
          删除
        </Button>,
      ],
    },
  ];

  const changeTable = (selectedRowKeys: React.Key[]) => {
    setSelectedRows(selectedRowKeys);
  };

  const handleShiftVisible = useCallback(() => {
    setVisible((value) => {
      if (value) {
        setId(null);
      }
      return !value;
    });
  }, []);

  const handleRequest = useCallback((params?: any) => {
    dispatch({
      type: 'detection/getCaseList',
      payload: {
        ...queryParams.current,
        ...pagination.current,
        ...params,
      },
    });
  }, []);

  const handleQuery = useCallback((params) => {
    queryParams.current = params;
    handleRequest();
  }, []);

  const handelChangePagination = useCallback((current, size) => {
    pagination.current = { current, size };
    handleRequest();
  }, []);

  const handleDelete = useCallback(
    (id) => {
      if (typeof id === 'number') {
        deleteCaseRequest([id]).then(() => {
          handleRequest();
        });
      } else {
        deleteCaseRequest(selectedRowKeys);
      }
    },
    [selectedRowKeys, handleRequest],
  );

  const MultipleExtendNode = () => (
    <div className={styles.extendNodeView}>
      <span className={styles.selectView}>
        已选择
        <span className={styles.num}>{selectedRowKeys?.length}</span>
        项目
      </span>
      <Button
        ghost
        danger
        size="small"
        style={{ marginLeft: 50 }}
        onClick={handleDelete}
      >
        批量删除
      </Button>
    </div>
  );

  useEffect(() => {
    handleRequest();
  }, []);

  return (
    <>
      <Page clsName={styles.dataQueryView}>
        <div className={styles.listWrapper}>
          <Query onSearch={handleQuery} />
          <hr className={styles.line} />
          <Page style={{ paddingLeft: 0, margin: 0 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleShiftVisible}
            >
              新建档案
            </Button>
            <CustomTable
              rowKey="id"
              loading={loading || deleteLoading}
              clsName={styles.tableView}
              columns={columns}
              dataSource={records}
              rowSelection={{
                type: 'checkbox',
                selectedRowKeys,
                onChange: changeTable,
              }}
              showAlert={!!selectedRowKeys?.length}
              multipleExtendNode={<MultipleExtendNode />}
              pagination={{
                showSizeChanger: true,
                total,
                onChange: handelChangePagination,
              }}
            />
          </Page>
          <Modal
            id={id}
            visible={visible}
            onClose={handleShiftVisible}
            onRefresh={handleRequest}
          />
        </div>
        {/* <Detail visible={show} id={id} onClose={() => setShow(false)} /> */}
      </Page>
    </>
  );
}

export default index;
