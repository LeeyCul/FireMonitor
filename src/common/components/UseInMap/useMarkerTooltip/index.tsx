import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Tooltip } from 'antd';
import useStateCallback from '@/common/hooks/useStateCallback';
import { LevelList } from '@/common/constant';
import styles from './style.less';
import Iconfont from '../../IconFont';

const iconMap = {
  1: 'iconsenlinhuoxian-lvse',
  2: 'iconsenlinhuoxian-lan',
  3: 'iconsenlinhuoxian-cheng',
  4: 'iconsenlinhuoxian-huang',
  5: 'iconsenlinhuoxian-hong',
};

interface Coordinates {
  x: number;
  y: number;
}

export default function useMarkerTooltip(
  mapId: string,
): [
  dom: React.ReactNode,
  handleShiftVisible: (config: { x: number; y: number; data: any }) => void,
  handleClose: () => void,
] {
  const offset = useRef<Coordinates>({ x: 0, y: 0 });
  const [visible, setVisible] = useStateCallback<boolean>(false);
  const [data, setData] = useState<any>();
  const [{ x, y }, setPosition] = useState<Coordinates>({ x: 0, y: 0 });
  const handleShiftVisible = useCallback(({ x, y, data }) => {
    setVisible(
      (value) => !value,
      (value) => {
        if (value) {
          setPosition({ x, y });
          setData(data);
        }
      },
    );
  }, []);
  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);
  const toolTipContent = useMemo(() => {
    if (!data) return null;
    const {
      temperature,
      humidity,
      levelSc1,
      name,
      rain,
      snow,
      wind,
      updatedAt,
    } = data;
    console.log(data);
    return (
      <div className={styles.toolTip}>
        <div>
          <Iconfont type={iconMap[levelSc1]} />
          <span>{name}</span>
          <p>
            <span>火险等级:{LevelList[levelSc1 - 1]?.text}</span>
            <span>最近数据更新:{updatedAt}</span>
          </p>
        </div>

        <span>温度:</span>
        <span>{temperature}</span>
        <br />
        <span>湿度:</span>
        <span>{humidity}</span>
        <br />
        <span>积雪厚度:</span>
        <span>{snow}</span>
        <br />
        <span>风速:</span>
        <span>{wind}</span>
        <br />
        <span>连续无降雨日:</span>
        <span>{`${rain}天`}</span>
        <br />
      </div>
    );
  }, [data]);
  const dom = useMemo(
    () => (
      <Tooltip
        placement="right"
        visible={visible && data}
        title={toolTipContent}
        color="rgba(0,0,0,0.6)"
      >
        <div
          id="@@s"
          style={{
            left: x - offset.current.x + 60,
            top: y - offset.current.y + 14,
            position: 'absolute',
          }}
        />
      </Tooltip>
    ),
    [toolTipContent, visible, x, y],
  );

  useEffect(() => {
    const { x, y } =
      (document?.getElementById(mapId)?.getBoundingClientRect() as {
        x: number;
        y: number;
      }) || {};
    offset.current = { x, y };
  }, []);

  return [dom, handleShiftVisible, handleClose];
}
