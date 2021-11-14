import React, { useState, useEffect, useCallback } from 'react';
import { Button, Divider } from 'antd';
import CustomTable from '@/common/components/CustomTable';
import Page from '@/common/components/Page';
import LevelTag from '@/common/components/LevelTag';
import Iconfont from '@/common/components/IconFont';
import Drag from '@/common/components/Drag';
import Query from './Query';
import styles from './style.less';

const dataSource = [
  { text: '区 域', filed: 'area', id: 1, status: 'a' },
  { text: '日 期', filed: 'time', id: 2, status: 'a' },
  { text: '最高气温', filed: 'max', id: 3, status: 'a' },
];
function index() {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const columns = [
    {
      title: '站 号',
      dataIndex: 'name',
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
      dataIndex: 'a1ge1',
      isShow: true,
    },
    {
      title: '所属市（区）',
      dataIndex: 'addr12ess1',
    },
    {
      title: '所属乡',
      dataIndex: 'addr12ess2',
    },
    {
      title: '最高气温',
      dataIndex: 'addr12ess3',
    },
    {
      title: '24小时降雨量',
      dataIndex: 'addr12ess4',
    },
    {
      title: '积雪深度',
      dataIndex: 'addr12ess5',
    },
    {
      title: '平均风速',
      dataIndex: 'addr12ess6',
    },
    {
      title: '国标火险等级',
      dataIndex: 'name2',
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
    // const columnsLists = columns.filter(item => item?.isShow);
    // const slelectKey = columns?.map(item => {
    //   if (!item?.isShow) return;
    //   return item?.dataIndex;
    // }).filter(Boolean);
    // setColumnsList(columnsLists);
    // setSlelectColKey(slelectKey as string[]);
  }, []);

  // const selectColChange = useCallback((checkedValues: any[]) => {
  //   const selectKeyList = columns.filter(item => checkedValues.includes(item.dataIndex));
  //   setColumnsList(selectKeyList);
  //   setSlelectColKey(checkedValues);
  // }, []);

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
        <span className={styles.updateTime}>更新于2021-11-12 12:00</span>
      </div>
      <Button icon={<Iconfont type="iconlayout" size={14} />}>下载</Button>
    </div>
  );

  return (
    <>
      <Page clsName={styles.dataQueryView}>
        <Query />
        <hr className={styles.line} />
        <Page
          icon="iconshujuliebiao"
          title={<PageTitle />}
          style={{ paddingLeft: 0, margin: 0 }}
        >
          <CustomTable
            clsName={styles.tableView}
            columns={columns}
            dataSource={data}
            rowSelection={{
              type: 'checkbox',
              onChange: changeTable,
            }}
            showAlert={!!selectedRows?.length}
            multipleExtendNode={<MultipleExtendNode />}
          />
        </Page>
      </Page>
      <Page title="统计图" icon="icondata">
        <div>
          <Drag dataSource={dataSource} onChange={() => {}} />
        </div>
      </Page>
    </>
  );
}

export default index;
