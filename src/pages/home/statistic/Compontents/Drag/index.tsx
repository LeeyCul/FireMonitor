import React, { CSSProperties, useState, ReactNode } from 'react';
import cls from 'classnames';
import _ from 'lodash';
import Iconfont from '@/common/components/IconFont';
import { figureList } from '@/common/constant';
import DataItem from '../DragItem';
import styles from './style.less';

interface RenderViewProps {
  children: React.ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  clssName?: string;
}

interface RenderDataViewProps {
  title?: string;
  children?: ReactNode;
  status?: string | number;
  clssName?: string;
}

const dataSource = [
  { icon: 'iconcalendar', text: '区 域', id: 1, status: 'a' },
  { icon: 'iconcalendar', text: '日 期', id: 2, status: 'a' },
  { icon: 'iconcalendar', text: '最高气温', id: 3, status: 'a' },
];

const STATUS_CODE: any = {
  STATUS_legend: '图例',
  STATUS_dataValue: '数据值',
};

function Drag() {
  const [active, setActive] = useState<string>('bar1');
  const [activeId, setActiveID] = useState<number | string | null>();
  const [data, setData] = useState<any[]>(dataSource);

  const RenderTitle = ({ title }: { title: string }) => (
    <div className={styles.titleView}>{title}</div>
  );

  const Title = ({ title }: { title: string }) => (
    <div className={styles.title}>{title}</div>
  );

  const RenderView = ({
    children,
    style,
    onClick,
    clssName,
  }: RenderViewProps) => (
    <div
      className={cls(styles.renderView, clssName)}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );

  const RenderDataView = ({
    title,
    children,
    status,
    clssName,
  }: RenderDataViewProps) => (
    <div
      className={styles.renderDataView}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        e.preventDefault();
      }}
      onDrop={() => onDrop(status as string)}
    >
      {title && <Title title={title} />}
      <div className={cls(styles.selectArea, clssName)}>{children}</div>
    </div>
  );

  const handleClick = (key: string) => {
    setActive(key);
  };

  const handleDragStart = (id: number | string) => {
    setActiveID(id);
  };

  const onDrop = (status: string | number) => {
    let record = data?.find((item) => item?.id === activeId);
    if (record.status !== status) {
      record.status = status;
      setData(data);
    }
  };

  const handleClickDel = (id: string | number) => {
    let tempData: any[] = _.cloneDeep(data);
    let record = tempData?.find((item) => item?.id === id);
    record.status = 'a';
    setData(tempData);
  };

  return (
    <div className={styles.dragView}>
      <div className={styles.sigleView}>
        <RenderTitle title="数据源" />
        <div className={styles.contentView}>
          <RenderDataView clssName={styles.selectAreaNo} status="a">
            {data
              .filter((item) => item?.status === 'a')
              ?.map((item) => (
                <DataItem
                  key={item?.id}
                  title={item?.text}
                  onDragStart={() => handleDragStart(item.id)}
                  onDragEnd={() => setActiveID(null)}
                />
              ))}
          </RenderDataView>
        </div>
      </div>
      <div className={styles.sigleView}>
        <RenderTitle title="数据绑定" />
        <div className={styles.contentView}>
          {Object.keys(STATUS_CODE).map((code) => (
            <RenderDataView key={code} title={STATUS_CODE[code]} status={code}>
              {data
                .filter((item) => item?.status === code)
                ?.map((subItem) => {
                  const { text, id } = subItem;
                  return (
                    <DataItem
                      showIcon
                      title={text}
                      key={id}
                      handleDel={() => handleClickDel(id)}
                      onDragStart={() => handleDragStart(id)}
                      onDragEnd={() => setActiveID(null)}
                    />
                  );
                })}
            </RenderDataView>
          ))}
        </div>
      </div>
      <div className={styles.sigleView}>
        <RenderTitle title="图形" />
        <div className={styles.contentView}>
          {figureList?.map((item, index) => {
            const { title, list } = item;
            return (
              <div key={index}>
                <Title title={title} />
                <div className={styles.picView}>
                  {list?.map((v, key) => (
                    <RenderView
                      clssName={cls({ [styles.active]: v.key === active })}
                      key={`${index}-${key}`}
                      style={{ width: 44, height: 44 }}
                      onClick={() => handleClick(v.key)}
                    >
                      <Iconfont type={v.icon} size={32} />
                    </RenderView>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Drag;
