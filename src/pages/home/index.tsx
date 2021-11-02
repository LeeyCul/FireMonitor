import { useCallback, useRef, useEffect, useState } from 'react';
import Amap from '@/common/components/Amap';
import Page from '@/common/components/Page';
import DataQuery from './dataQuery';
import Statistic from './statistic';
import styles from './style.less';
import {} from '@ant-design/pro-layout';

function Home() {
  const AmapRef = useRef<any>();
  const mapRef = useRef<AMap.Map>();
  const [mapReady, setMapReady] = useState<boolean>(false);
  const drawDistrict = useCallback((AMap, map) => {
    const district = new AMap.DistrictSearch({
      extensions: 'all',
      level: 'district',
    });

    AmapRef.current = Amap;
    mapRef.current = map;
    setMapReady(true);
    district.search('四川', (_: any, result: any) => {
      const bounds = result.districtList[0].boundaries;
      const polygons = [];
      if (bounds) {
        for (let i = 0, l = bounds.length; i < l; i++) {
          const polygon = new AMap.Polygon({
            map,
            strokeWeight: 1,
            path: bounds[i],
            fillOpacity: 0.7,
            fillColor: '#CCF3FF',
            strokeColor: '#CC66CC',
          });
          polygons.push(polygon);
        }
        // 地图自适应
        map.setFitView();
      }
    });
  }, []);

  useEffect(() => {
    // todo 获取数据
    console.log(AmapRef.current);
    // todo 描点
  }, [mapReady]);

  return (
    <div className={styles.conainer} id="conainer">
      <Amap mapId="HOMEMAP" onLoadCallback={drawDistrict} />
    </div>
  );
}

const { TabPane } = Tabs;

function Home() {
  const AmapRef = useRef<any>();
  const mapRef = useRef<AMap.Map>();
  const [mapReady, setMapReady] = useState<boolean>(false);
  const drawDistrict = useCallback((AMap, map) => {
    const district = new AMap.DistrictSearch({
      extensions: 'all',
      level: 'district',
    });

    AmapRef.current = Amap;
    mapRef.current = map;
    setMapReady(true);
    district.search('四川', (_: any, result: any) => {
      const bounds = result.districtList[0].boundaries;
      const polygons = [];
      if (bounds) {
        for (let i = 0, l = bounds.length; i < l; i++) {
          const polygon = new AMap.Polygon({
            map,
            strokeWeight: 1,
            path: bounds[i],
            fillOpacity: 0.7,
            fillColor: '#CCF3FF',
            strokeColor: '#CC66CC',
          });
          polygons.push(polygon);
        }
        // 地图自适应
        map.setFitView();
      }
    });
  }, []);
  const callback = () => {};

  useEffect(() => {
    // todo 获取数据
    console.log();
    // todo 描点
  }, [mapReady]);

  return (
    <Tabs defaultActiveKey="3" onChange={callback} className={styles.TabsView}>
      <TabPane tab="火险等级" key="1">
        <div className={styles.mapView}>
          <Amap mapId="HOMEMAP" onLoadCallback={drawDistrict} />
          <LevelBar />
          <ToolBar />
        </div>
      </TabPane>
      <TabPane tab="数据查询" key="2">
        <DataQuery />
      </TabPane>
      <TabPane tab="统计分析" key="3">
        <Statistic />
      </TabPane>
      <TabPane tab="案例库" key="4">
        <Page>案例库</Page>
      </TabPane>
    </Tabs>
  );
}

export default Home;
