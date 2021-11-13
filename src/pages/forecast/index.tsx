import { useCallback, useEffect, useRef, useState } from 'react';
import { Radio, Tabs, DatePicker, Button, Cascader, Form } from 'antd';
import cn from 'classnames';
import Amap from '@/common/components/Amap';
import Page from '@/common/components/Page';
import styles from './style.less';
import Iconfont from '@/common/components/IconFont';
import { useForm } from 'antd/es/form/Form';
import CustomMarkerHtml from '@/common/components/UseInMap/CustomMarker';
import LevelBar from '@/common/components/UseInMap/LevelBar';
import ToolBar from '@/common/components/UseInMap/ToolBar';
import useMapShiftBar from '@/common/components/UseInMap/MapShiftBar';

const mock = [
  { temperature: 23, x: '102.54', y: '30.05', level: 1 },
  { temperature: 23, x: '101.54', y: '30.05', level: 2 },
  { temperature: 23, x: '102.54', y: '29.05', level: 3 },
  { temperature: 23, x: '100.54', y: '30.05', level: 4 },
  { temperature: 23, x: '102.54', y: '28.05', level: 5 },
];

const areaOptions = [
  { label: '行政区域', value: 'xx' },
  { label: '地理分区', value: 'yy' },
];

function FilterBar(props: any) {
  const { onFilter } = props;
  const [form] = useForm();
  const [visible, setVisible] = useState<boolean>(true);
  const handleShiftVisible = useCallback(
    () => setVisible((value) => !value),
    [],
  );
  const handleFilter = useCallback(() => {
    onFilter && onFilter(form.getFieldsValue());
  }, [onFilter, form]);

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterBarHeader}>
        <div>
          <Iconfont type="iconmenu" />
          <strong>信息查询</strong>
        </div>
        <div
          onClick={handleShiftVisible}
          className={cn(styles.expandIcon, visible ? styles.activeIcon : '')}
        >
          <Iconfont type="iconarrow-double-up" />
        </div>
      </div>
      <Form form={form}>
        <div
          className={cn(styles.filterBox, visible ? styles.activeFilter : '')}
        >
          <div className={styles.searchItem}>
            <span className={styles.label}>时间</span>
            <Form.Item name="date" className={styles.content}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </div>
          <div className={styles.searchItem}>
            <span className={styles.label}>来源</span>
            <Form.Item name="source" className={styles.content}>
              <Cascader />
            </Form.Item>
          </div>
          <div className={styles.searchItem}>
            <span className={styles.label}>地区</span>
            <div className={styles.content}>
              <Form.Item name="type" style={{ margin: 0 }}>
                <Radio.Group
                  name="type"
                  options={areaOptions}
                  className={styles.radio}
                />
              </Form.Item>
              <Form.Item name="area">
                <Cascader />
              </Form.Item>
            </div>
          </div>
          <div className={styles.searchItem}>
            <span className={styles.label}>标准</span>
            <Form.Item name="standard" className={styles.content}>
              <Cascader />
            </Form.Item>
          </div>
          <div className={styles.filterButton}>
            <Button size="large" type="primary" onClick={handleFilter}>
              查询
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
const { TabPane } = Tabs;

function Home() {
  const AmapRef = useRef<any>();
  const mapRef = useRef<AMap.Map>();
  const preMarkerList = useRef<AMap.Marker[]>([]);
  const satelliteLayer = useRef<AMap.TileLayer.Satellite>();
  const [isSatellite, MapShiftBar] = useMapShiftBar();
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [hideLevel, setHideLevel] = useState<number[]>([]);
  const [markList, setMarkList] = useState<any[]>(mock);

  // 地图加载好后回调
  const handleLoadMap = useCallback((AMap, map) => {
    const district = new AMap.DistrictSearch({
      extensions: 'all',
      level: 'district',
      bubble: true,
    });
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
    AmapRef.current = AMap;
    mapRef.current = map;
    setMapReady(true);
  }, []);

  // 点击自定义标签
  const handleClickMarker = useCallback((e) => {
    const data = e.target.getExtData(); // 获取到对应坐标的数据
    console.log(e);
    // todo 点击显示弹窗内容
  }, []);

  const handleFilter = useCallback((search) => {
    // todo request
  }, []);

  // 切换卫星/行政图
  useEffect(() => {
    if (mapReady) {
      const layer =
        satelliteLayer.current ||
        (satelliteLayer.current = new AmapRef.current.TileLayer.Satellite());
      if (isSatellite) {
        mapRef.current?.add(layer);
      } else {
        mapRef.current?.remove(layer);
      }
    }
  }, [mapReady, isSatellite]);

  useEffect(() => {
    if (mapReady) {
      mapRef.current?.remove(preMarkerList.current);
      preMarkerList.current.map((instance) =>
        instance.off('click', handleClickMarker),
      );
      const markerList = markList
        .filter((item) => hideLevel.every((hide) => item.level !== hide))
        .map(
          (mark) =>
            new AmapRef.current.Marker({
              extData: mark,
              clickable: true,
              position: new AMap.LngLat(mark.x, mark.y), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              content: CustomMarkerHtml(mark.temperature, mark.level),
            }),
        );
      markerList.map((instance) => instance.on('click', handleClickMarker));
      preMarkerList.current = markerList;
      mapRef.current!.add(markerList);
    }
  }, [mapReady, markList, hideLevel]);

  return (
    <Tabs defaultActiveKey="1" className={styles.TabsView}>
      <TabPane tab="火险等级" key="1">
        <div className={styles.mapView}>
          <Amap mapId="FORECAST" onLoadCallback={handleLoadMap} />
          <LevelBar onChange={setHideLevel} />
          <ToolBar />
          <FilterBar onFilter={handleFilter} />
          {MapShiftBar}
        </div>
      </TabPane>
      <TabPane tab="数据查询" key="2">
        <Page title="数据查询" icon="icondata">
          数据查询
        </Page>
      </TabPane>
      <TabPane tab="统计分析" key="3">
        <Page>统计分析</Page>
      </TabPane>
    </Tabs>
  );
}

export default Home;