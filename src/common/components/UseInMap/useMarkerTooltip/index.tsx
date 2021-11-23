import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Tooltip } from 'antd';
import useStateCallback from '@/common/hooks/useStateCallback';
import { LevelList } from '@/common/constant';

interface Coordinates {
  x: number;
  y: number;
}

export default function useMarkerTooltip(mapId: string) {
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
  const toolTipContent = useMemo(() => {
    if (!data) return null;
    const { temperature, humidity, levelSc1, name, rain, snow, wind } = data;

    return (
      <div>
        <span>{name}</span>
        <br />
        <span>火险等级:</span>
        <span>{LevelList[levelSc1 - 1].text}</span>
        <br />
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
    const { x, y } = document.getElementById(mapId)?.getBoundingClientRect();
    offset.current = { x, y };
  }, []);

  return [dom, handleShiftVisible];
}
