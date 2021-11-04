import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import AMapLoader from '@amap/amap-jsapi-loader';
import { BasicConstants } from '@/common/constant/index';
import styles from './style.less';

interface IProps {
  mapId: string;
  style?: React.CSSProperties;
  className?: string;
  onLoadCallback?: (Amap: any, mapInstance: AMap.Map) => void;
}

export default (props: IProps) => {
  const { style, className, mapId, onLoadCallback } = props;
  const [locaState, setLocaState] = useState<any>();

  useEffect(() => {
    AMapLoader.load({
      key: BasicConstants.MapKey,
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.MarkerClusterer', 'AMap.Size', 'AMap.DistrictSearch'],
      Loca: {
        // 是否加载 Loca， 缺省不加载
        version: '2.0', // Loca 版本，缺省 1.3.2
      },
    })
      .then((AMap) => {
        const map = new AMap.Map(mapId, {
          zoom: 6,
          center: [102.796654, 30.001704],
          viewMode: '2D',
        });
        map.on('click', (e: any) => {
          console.log(e);
        });

        // 创建loca
        const { Loca } = window as any;

        let loca = new Loca.Container({
          map,
        });
        (window as any)._loca = loca;
        setLocaState(loca);
        onLoadCallback && onLoadCallback(AMap, map);
      })
      .catch((e) => {
        console.warn(e);
      });
    return () => {
      locaState?.destroy();
    };
  }, []);

  return (
    <div
      id={mapId}
      className={cls(styles.mapConainer, className)}
      style={{
        ...style,
      }}
    />
  );
};
