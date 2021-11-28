import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'umi';
import { useRequest } from 'ahooks';
import CustomTable from '@/common/components/CustomTable';
import Page from '@/common/components/Page';
import LevelTag from '@/common/components/LevelTag';
import Iconfont from '@/common/components/IconFont';
import Drag from '@/common/components/Drag';
import { RenderCharts } from '@/common/components/Echarts';
import Query from './Query';
import styles from './style.less';
import { getCityList, getIndicator } from '@/common/api';

function index() {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [activeChaets, setActiveChaets] = useState<string>('bar1');
  const dispathch = useDispatch();
  const {
    columns: catColumns,
    resultList,
    fireList,
  } = useSelector((state: any) => state.detection);
  // const [columnsList, setColumnsList] = useState<any[]>([]);
  // const [slelectColKey, setSlelectColKey] = useState<string[]>();
  const { data: indicatorData } = useRequest<any>(() => getIndicator(), {
    formatResult: (res: any) =>
      res?.payload?.model && JSON.parse(res?.payload?.model),
  });
  useEffect(() => {
    getCityList().then((res) => {
      console.log('res', resultList);
    });
  }, []);

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
            dataSource={fireList}
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
            onChange={(category, dataValue, type) => {
              setActiveChaets(type);
              const data = dataValue?.map((item) => ({
                column: item,
                func: 'sum',
              }));
              dispathch({
                type: 'detection/getChartsFetchData',
                payload: { groups: category, aggregators: data },
              });
            }}
          />
          <RenderCharts
            activeChaets={activeChaets}
            columns={catColumns}
            resultList={resultList}
          />
        </div>
      </Page>
    </>
  );
}

export default index;
