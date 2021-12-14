import { useState } from 'react';
import { Radio } from 'antd';
import Iconfont from '@/common/components/IconFont';
import styles from './style.less';
import LevelTag from '@/common/components/LevelTag';
import LineCharts from '@/common/components/Echarts/ChartsLine';
import CustomTable from '@/common/components/customTable';

const optionsWithDisabled = [
  { label: '表格', value: 'table' },
  { label: '图形', value: 'charts' },
];

interface Props {
  graphVal: number;
}

function diagram({ graphVal }: Props) {
  const [radioVal, setradioVal] = useState<string>('charts');

  const onChange = (e: any) => {
    setradioVal(e.target.value);
  };
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
  return (
    <div className={styles.diagram}>
      <div className={styles.headerView}>
        <div className={styles.diagramtitle}>
          <Iconfont type="iconimage-text" />
          数据查询图形化展现结果
        </div>
        <div>
          <Radio.Group
            options={optionsWithDisabled}
            onChange={onChange}
            value={radioVal}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
      </div>
      {radioVal === 'table' ? (
        <CustomTable
          clsName={styles.tableView}
          columns={columns}
          dataSource={[]}
        />
      ) : (
        <LineCharts />
      )}
    </div>
  );
}

export default diagram;
