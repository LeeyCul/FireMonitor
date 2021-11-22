import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Tooltip } from 'antd';
import useStateCallback from '@/common/hooks/useStateCallback';

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

  const dom = useMemo(
    () => (
      <Tooltip
        placement="right"
        visible={visible}
        title={<div style={{ width: 400 }}>data</div>}
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
    [data, visible, x, y],
  );

  useEffect(() => {
    const { x, y } = document.getElementById(mapId)?.getBoundingClientRect();
    offset.current = { x, y };
  }, []);

  return [dom, handleShiftVisible];
}
