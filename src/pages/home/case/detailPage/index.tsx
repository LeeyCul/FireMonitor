import { Button, Upload } from 'antd';
import { useState, useEffect, useRef, useCallback } from 'react';
import dayjs from 'dayjs';
import Page from '@/common/components/Page';
import CustomTable from '@/common/components/customTable';
import styles from './style.less';
import LevelTag from '@/common/components/LevelTag';
import SiChuanMap from '@/common/components/SichuanMap';
import { getQueryDayFilter } from '@/common/api/index';

interface Props {
  data: any;
  onClose: () => void;
}

function index(props: Props) {
  const { data, onClose } = props;
  const { title, description, file, endTime, startTime, area } = data;
  const [list, setList] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const pagination = useRef<{ current: number; size: number }>({
    current: 1,
    size: 10,
  });
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

  const handleRequest = useCallback(() => {
    getQueryDayFilter({
      ...pagination.current,
      start: dayjs(startTime).format('YYYY-MM-DD'),
      end: dayjs(endTime).format('YYYY-MM-DD'),
      code: area,
    }).then(({ data }) => {
      const { records, total } = data;
      setList(records);
      setTotal(total);
    });
  }, [endTime, startTime, area]);

  const handelChangePagination = useCallback((current, size) => {
    pagination.current = { current, size };
    handleRequest();
  }, []);

  const TitleCard = ({ title }: { title: string }) => (
    <div className={styles.titleCard}>{title}</div>
  );

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  return (
    <Page clsName={styles.detailView}>
      <div className={styles.btnBackView}>
        <Button type="primary" onClick={onClose}>
          返回
        </Button>
        &emsp;
      </div>
      <div className={styles.title}>{title}</div>
      <TitleCard title="简介" />
      <p className={styles.referral}>{description}</p>
      <TitleCard title="等级图" />
      <div className={styles.gradeView}>
        <SiChuanMap />
      </div>
      <TitleCard title="数据表" />
      <CustomTable
        dataSource={list}
        columns={columns}
        pagination={{
          total,
          showSizeChanger: true,
          onChange: handelChangePagination,
        }}
      />
      <TitleCard title="附件" />
      {!!file && (
        <Upload
          fileList={JSON.parse(file)}
          showUploadList={{
            showDownloadIcon: false,
            showRemoveIcon: false,
          }}
        >
          <span />
        </Upload>
      )}
    </Page>
  );
}

export default index;
