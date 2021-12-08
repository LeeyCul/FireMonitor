import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import {
  Radio,
  Tabs,
  DatePicker,
  Button,
  Cascader,
  Form,
  Slider,
  Dropdown,
  Menu,
} from 'antd';
import {
  PauseOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import cn from 'classnames';
import { useForm } from 'antd/es/form/Form';
import Amap from '@/common/components/Amap';
import styles from './style.less';
import Iconfont from '@/common/components/IconFont';
import CustomMarkerHtml from '@/common/components/UseInMap/CustomMarker';
import LevelBar from '@/common/components/UseInMap/LevelBar';
import ToolBar from '@/common/components/UseInMap/ToolBar';
import useMapShiftBar from '@/common/components/UseInMap/MapShiftBar';
import Query from './dataQuery';
import Statistic from './statistic';
import useMarkerTooltip from '@/common/components/UseInMap/useMarkerTooltip';
import MockOrigin from './mock.json';

const menuOptions = [
  { value: 1, label: '1秒' },
  { value: 10, label: '10秒' },
  { value: 30, label: '30秒' },
];

function generateMock() {
  const list = [];
  for (let i = 0; i < 5; i++) {
    list.push({
      date: `2021-12-1${i} 14:00:00`,
      list: MockOrigin.map(({ temperature, levelSc1, ...res }) => ({
        temperature: Number((Math.random() * 60 - 20).toFixed(2)),
        levelSc1: Math.max(Number(Math.floor(Math.random() * 6).toFixed(0)), 1),
        ...res,
      })),
    });
  }
  return list;
}

const areaOptions = [
  { label: '行政区域', value: 'xx' },
  { label: '地理分区', value: 'yy' },
];
const mapId = 'FORECAST';
function Progress(props: { onShiftMarker: () => void; data: any[] }) {
  const { onShiftMarker, data } = props;
  const timer = useRef<NodeJS.Timer>();
  const step = useRef<number>(0);
  const [playState, setPaly] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [interval, setInterval] = useState<number>(menuOptions[0].value);
  const menu = useMemo(
    () => (
      <Menu>
        {menuOptions.map(({ value, label }) => (
          <Menu.Item key={value} disabled>
            {label}
          </Menu.Item>
        ))}
      </Menu>
    ),
    [],
  );
  const play = useCallback(() => {
    setPaly(true);
    timer.current && clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setValue((value) => {
        if (value >= step.current && timer.current) {
          clearInterval(timer.current);
          setPaly(false);
          return 0;
        }
        return value + 1;
      });
    }, 1000);
  }, []);

  const pause = useCallback(() => {
    setPaly(false);
    timer.current && clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (data) {
      step.current = data.length * interval;
    }
  }, [data, interval]);

  useEffect(() => {
    if (props.data && value) {
      const current = Math.floor(value / interval);
      props.onShiftMarker(props.data[current - 1]?.list || []);
    }
  }, [interval, value]);

  return (
    <div className={styles.slider}>
      <div className={styles.slider_play}>
        {playState ? (
          <PauseOutlined style={{ color: '#0095FB' }} onClick={pause} />
        ) : (
          <CaretRightOutlined style={{ color: '#0095FB' }} onClick={play} />
        )}
      </div>
      <Slider
        style={{ flex: 1 }}
        min={0}
        max={data?.length * interval}
        value={value}
        tooltipVisible={playState}
        tooltipPlacement="bottom"
        tipFormatter={() => '??!1'}
      />
      <Dropdown overlay={menu}>
        <div className={styles.slider_menu}>
          <span>{interval}秒</span>
          <CaretDownOutlined />
        </div>
      </Dropdown>
    </div>
  );
}

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
  const [markList, setMarkList] = useState<any[]>([]);
  const [dom, handleShow] = useMarkerTooltip(mapId);
  const [data, setData] = useState<any[]>(generateMock());

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
  const handleClickMarker = useCallback(
    (e) => {
      const data = e.target.getExtData(); // 获取到对应坐标的数据
      const { x, y, offsetX, offsetY } = e.originEvent;
      console.log(e.originEvent);
      handleShow({ x: x - offsetX, y: y - offsetY, data });

      // todo 点击显示弹窗内容
    },
    [handleShow],
  );

  const handleFilter = useCallback((search) => {
    // todo request
  }, []);

  const handleShiftMarker = useCallback((list) => {
    console.log(list);
    setMarkList(list);
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
        .filter((item) => hideLevel.every((hide) => item.levelSc1 !== hide))
        .map(
          (mark) =>
            new AmapRef.current.Marker({
              extData: mark,
              clickable: true,
              position: new AMap.LngLat(mark.lng, mark.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              content: CustomMarkerHtml(mark.temperature, mark.levelSc1),
            }),
        );
      // handleCloseTooltip();
      markerList.map((instance) => instance.on('click', handleClickMarker));
      preMarkerList.current = markerList;
      mapRef.current!.add(markerList);
    }
  }, [mapReady, markList, hideLevel]);
  return (
    <Tabs defaultActiveKey="1" className={styles.TabsView}>
      <TabPane tab="火险等级" key="1">
        <div className={styles.mapView}>
          <Amap mapId={mapId} onLoadCallback={handleLoadMap} />
          <LevelBar onChange={setHideLevel} />
          <ToolBar />
          <FilterBar onFilter={handleFilter} />
          {MapShiftBar}
          {dom}
          <Progress data={data} onShiftMarker={handleShiftMarker} />
        </div>
      </TabPane>
      <TabPane tab="数据查询" key="2">
        <Query />
      </TabPane>
      <TabPane tab="统计分析" key="3">
        <Statistic />
      </TabPane>
    </Tabs>
  );
}

export default Home;
