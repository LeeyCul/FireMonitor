import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';
import Page from '@/common/components/Page';
import CustomTable from '@/common/components/customTable';
import dengji1 from '@/common/images/dengji1.png';
import dengji2 from '@/common/images/dengji2.png';
import styles from './style.less';
import LevelTag from '@/common/components/LevelTag';

function index() {
  const data = [
    { device: '001', name: '成都', temperature: '35' },
    { device: '002', name: '自贡', temperature: '12' },
    { device: '003', name: '德阳', temperature: '15' },
  ];
  const columns = [
    {
      title: '站 号',
      dataIndex: 'device',
    },
    {
      title: '站 名',
      dataIndex: 'age1',
    },
    {
      title: '数据来源',
      dataIndex: 'addres1s1',
    },
    {
      title: '日 期',
      dataIndex: 'time',
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
    },
    {
      title: '24小时降雨量',
      dataIndex: 'rain',
    },
    {
      title: '积雪深度',
      dataIndex: 'snow',
    },
    {
      title: '平均风速',
      dataIndex: 'wind',
    },
    {
      title: '国标火险等级',
      dataIndex: 'levelSc1',
      render: (index: number) => <LevelTag level={index} />,
    },
  ];

  const TitleCard = ({ title }: { title: string }) => (
    <div className={styles.titleCard}>{title}</div>
  );

  return (
    <Page clsName={styles.detailView}>
      <div className={styles.btnBackView}>
        <Button type="primary" onClick={() => history.goBack()}>
          返回
        </Button>
        &emsp;
      </div>
      <div className={styles.title}>2020第三季度森林火险等级月平均</div>
      <TitleCard title="简介" />
      <p className={styles.referral}>
        四川省第三季度森林火险等级月平均值逐月情况展示。
      </p>
      <TitleCard title="等级图" />
      <div className={styles.gradeView}>
        <img src={dengji1} alt="" className={styles.imgsty} />
        <img src={dengji2} alt="" className={styles.imgsty} />
      </div>
      <TitleCard title="数据表" />
      <CustomTable dataSource={data} columns={columns} />
      <TitleCard title="附件" />
    </Page>
  );
}

export default index;
