import React, {
  CSSProperties,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import cls from 'classnames';
import { message } from 'antd';
import Iconfont from '@/common/components/IconFont';
import { figureList, STATUS_CODE, DATASOUCE_CODE } from '@/common/constant';
import DataItem from './DragItem';
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

interface Props {
  dataSource: Object | any;
  onChange: (category: string[], dataValue: string[], chart: string) => void;
}

function Drag({ dataSource, onChange }: Props) {
  const [active, setActive] = useState<string>('bar1');
  const [activeId, setActiveID] = useState<number | string | null>();
  const [data, setData] = useState<any>(dataSource);
  const [category, setCategory] = useState<string[]>([]);
  const [dataValue, setDataValue] = useState<string[]>([]);

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);
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
      className={cls(styles.renderDataView)}
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
    onChange(category, dataValue, key);
  };

  const handleDragStart = (id: number | string) => {
    setActiveID(id);
  };

  const upDate = useCallback(() => {
    const category = Object.keys(data)
      .map((item) => {
        if (data[item]?.checked === 'category') {
          return item;
        }
        return null;
      })
      ?.filter(Boolean);
    const valueList = Object.keys(data)
      .map((item) => {
        if (data[item]?.checked === 'value') {
          return item;
        }
        return null;
      })
      ?.filter(Boolean);
    setCategory(category as string[]);
    setDataValue(valueList as string[]);
    onChange(category as string[], valueList as string[], active);
  }, [data]);

  const onDrop = (status: string | number) => {
    let tempData = data;
    let record = tempData?.[activeId as string];
    if (record?.modelType !== status) {
      return message.warning(`不能将该类型放置在${STATUS_CODE[status]}中`);
    }
    if (!record?.checked) {
      record.checked = status;
      setData(tempData);
    }
    upDate();
  };

  const handleClickDel = (id: string | number) => {
    let tempData = data;
    let record = tempData?.[id as string];
    record.checked = '';
    setData(tempData);
    upDate();
  };

  return (
    <div className={styles.dragView}>
      <div className={styles.sigleView}>
        <RenderTitle title="数据源" />
        <div className={styles.contentView}>
          {Object.keys(DATASOUCE_CODE)?.map((item) => (
            <RenderDataView
              key={item}
              clssName={styles.selectAreaNo}
              title={DATASOUCE_CODE[item]}
              status="a"
            >
              {Object.keys(data || []).map((sub) => {
                if (data[sub]?.modelType === item && !data[sub]?.checked) {
                  return (
                    <DataItem
                      key={sub}
                      title={sub}
                      onDragStart={() => handleDragStart(sub)}
                      onDragEnd={() => setActiveID(null)}
                    />
                  );
                }
                return null;
              })}
            </RenderDataView>
          ))}
        </div>
      </div>
      <div className={styles.sigleView}>
        <RenderTitle title="数据绑定" />
        <div className={styles.contentView}>
          {Object.keys(STATUS_CODE).map((code) => (
            <RenderDataView key={code} title={STATUS_CODE[code]} status={code}>
              {data &&
                Object.keys(data).map((item) => {
                  if (data[item].checked === code) {
                    return (
                      <DataItem
                        showIcon
                        title={item}
                        key={item}
                        handleDel={() => handleClickDel(item)}
                        onDragStart={() => handleDragStart(item)}
                        onDragEnd={() => setActiveID(null)}
                      />
                    );
                  }
                  return null;
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
