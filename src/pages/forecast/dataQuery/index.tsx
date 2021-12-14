import React, { useState, useEffect, useCallback } from 'react';
import { useRequest } from 'ahooks';
import CustomTable from '@/common/components/CustomTable';
import Page from '@/common/components/Page';
import LevelTag from '@/common/components/LevelTag';
import Dropdown from '@/common/components/DropdownCol';
import * as apis from '@/common/api';
import Query from './Query';
import styles from './style.less';

const columns = [
  {
    title: '站 号',
    dataIndex: 'device',
    ellipsis: true,
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
    ellipsis: true,
    isShow: true,
  },
  {
    title: '所属市（区）',
    dataIndex: 'name',
    ellipsis: true,
    isShow: true,
  },
  {
    title: '所属乡',
    dataIndex: 'addr12ess2',
    ellipsis: true,
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
    isShow: true,
  },
  {
    title: '国标火险等级',
    dataIndex: 'levelSc1',
    isShow: true,
    render: (index: number) => <LevelTag level={index} />,
  },
];

function index() {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [columnsList, setColumnsList] = useState<any[]>([]);
  const [slelectColKey, setSlelectColKey] = useState<string[]>();
  const [query, setQuery] = useState<any>({});

  const {
    data: allInfo,
    run: runList,
    loading,
  } = useRequest(apis.getPredDataFilter, {
    formatResult: (res) => res?.data,
  });
  const { records, total } = allInfo || {};

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
  }, []);
  const changePage = (current: number, size?: number) => {
    runList({ size, current, ...query });
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
            runList(value);
          }}
        />
        <hr className={styles.line} />
        <Page
          icon="iconsousuojieguo"
          title={<PageTitle />}
          style={{ paddingLeft: 0, margin: 0 }}
        >
          <CustomTable
            loading={loading}
            clsName={styles.tableView}
            columns={columnsList}
            dataSource={records}
            rowSelection={{
              type: 'checkbox',
              onChange: changeTable,
            }}
            pagination={{
              showSizeChanger: true,
              total,
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
