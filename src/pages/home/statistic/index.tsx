import React, { useState, useEffect, useCallback } from 'react';
import { Button, Divider } from 'antd';
import { useRequest } from 'ahooks';
import CustomTable from '@/common/components/CustomTable';
import Page from '@/common/components/Page';
import LevelTag from '@/common/components/LevelTag';
import Iconfont from '@/common/components/IconFont';
import Drag from '@/common/components/Drag';
import { Bar } from '@/common/components/Echarts';
import Query from './Query';
import styles from './style.less';
import { getIndicator } from '@/common/api';

// const dataSource = [
//   { text: '区 域', filed: 'area', id: 1, status: 'a' },
//   { text: '日 期', filed: 'time', id: 2, status: 'a' },
//   { text: '最高气温', filed: 'max', id: 3, status: 'a' },
// ];

function index() {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [activeChaets, setActiveChaets] = useState<string>('bar1');
  // const [columnsList, setColumnsList] = useState<any[]>([]);
  // const [slelectColKey, setSlelectColKey] = useState<string[]>();
  const { data: indicatorData } = useRequest<any>(() => getIndicator(), {
    formatResult: (res: any) =>
      res?.payload?.model && JSON.parse(res?.payload?.model),
  });

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

  // useEffect(async () => {
  //   const data = await getIndicator();
  //   const { payload } = data;
  //   console.log('data', JSON.parse(payload.model));
  // }, []);

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

  const renderEcharts = () => {
    switch (activeChaets) {
      case 'bar1':
        return <Bar />;
      case 'bar2':
        return <Bar direction="level" />;
      default:
        return <Bar />;
    }
  };

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
        <div className={styles.echartsView}>
          <Drag
            dataSource={indicatorData}
            // a={{ 年份: { sqlType: 'BIGINT', visualType: 'number', modelType: 'category' }, 专利技术: { sqlType: 'BIGINT', visualType: 'number', modelType: 'value' }, 知识产权技术: { sqlType: 'BIGINT', visualType: 'number', modelType: 'value' }, 标准信息: { sqlType: 'BIGINT', visualType: 'number', modelType: 'value' }, 其他成果: { sqlType: 'BIGINT', visualType: 'number', modelType: 'value' } }}
            onChange={(a, b, c) => {
              setActiveChaets(c);
              console.log('a', a, b, c);
            }}
          />
          {renderEcharts()}
          {/* <Bar /> */}
        </div>
      </Page>
    </>
  );
}

export default index;
