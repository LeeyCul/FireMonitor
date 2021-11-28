import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'umi';
import CustomTable from '@/common/components/CustomTable';
import Page from '@/common/components/Page';
import LevelTag from '@/common/components/LevelTag';
import Dropdown from '@/common/components/DropdownCol';
import Query from './Query';
import styles from './style.less';

function index() {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [columnsList, setColumnsList] = useState<any[]>([]);
  const [slelectColKey, setSlelectColKey] = useState<string[]>();
  const [query, setQuery] = useState<any>({});
  const dispatch = useDispatch();
  const { dataQuery } = useSelector((state: any) => state.detection);
  const { list, totalRow } = dataQuery || {};
  const columns = [
    {
      title: '站 号',
      dataIndex: 'device',
      isShow: true,
    },
    {
      title: '站 名',
      dataIndex: 'age1',
      isShow: true,
    },
    {
      title: '数据来源',
      dataIndex: 'addres1s1',
      isShow: true,
    },
    {
      title: '日 期',
      dataIndex: 'time',
      isShow: true,
    },
    {
      title: '所属市（区）',
      dataIndex: 'name',
    },
    {
      title: '所属乡',
      dataIndex: 'addr12ess2',
    },
    {
      title: '最高气温',
      dataIndex: 'temperature',
      isShow: true,
    },
    {
      title: '24小时降雨量',
      dataIndex: 'rain',
      isShow: true,
    },
    {
      title: '积雪深度',
      dataIndex: 'snow',
      isShow: true,
    },
    {
      title: '平均风速',
      dataIndex: 'wind',
    },
    {
      title: '国标火险等级',
      dataIndex: 'levelSc1',
      isShow: true,
      render: (index: number) => <LevelTag level={index} />,
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
    const columnsLists = columns.filter((item) => item?.isShow);
    const slelectKey = columns
      ?.map((item) => {
        if (!item?.isShow) return;
        return item?.dataIndex;
      })
      .filter(Boolean);

    setColumnsList(columnsLists);
    setSlelectColKey(slelectKey as string[]);
    dispatch({
      type: 'detection/getDataQuery',
      payload: { size: 10, ...query },
    });
  }, []);

  const changePage = (current: number, size?: number) => {
    dispatch({
      type: 'detection/getDataQuery',
      payload: { size, current, ...query },
    });
  };

  const selectColChange = useCallback((checkedValues: any[]) => {
    const selectKeyList = columns.filter((item) =>
      checkedValues.includes(item.dataIndex),
    );
    setColumnsList(selectKeyList);
    setSlelectColKey(checkedValues);
  }, []);

  const MultipleExtendNode = () => (
    <div className={styles.extendNodeView}>
      <span className={styles.selectView}>
        已选择
        <span className={styles.num}>{selectedRows?.length}</span>
        项目
      </span>
      <span className={styles.btn}>导出</span>
    </div>
  );

  const PageTitle = () => (
    <div className={styles.pageTitleView}>
      <div>
        查询结果
        {/* <span className={styles.updateTime}>更新于2021-11-12 12:00</span> */}
      </div>
      <div>
        显示列&emsp;
        <Dropdown
          columns={columns}
          value={slelectColKey as string[]}
          onChange={selectColChange}
        />
      </div>
    </div>
  );
  return (
    <>
      <Page clsName={styles.dataQueryView}>
        <Query
          onChange={(value) => {
            setQuery(value);
            dispatch({
              type: 'detection/getDataQuery',
              payload: { size: 10, ...value },
            });
          }}
        />
        <hr className={styles.line} />
        <Page
          icon="iconsousuojieguo"
          title={<PageTitle />}
          style={{ paddingLeft: 0, margin: 0 }}
        >
          <CustomTable
            clsName={styles.tableView}
            columns={columnsList}
            rowKey="name"
            dataSource={list}
            // rowSelection={{
            //   type: 'checkbox',
            //   onChange: changeTable,
            // }}
            pagination={{
              showSizeChanger: true,
              total: totalRow,
              onChange: changePage,
            }}
            showAlert={!!selectedRows?.length}
            multipleExtendNode={<MultipleExtendNode />}
          />
        </Page>
      </Page>
    </>
  );
}

export default index;
