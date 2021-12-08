import { useCallback, useEffect, useRef, useState } from 'react';
import { Radio, Tabs, DatePicker, Button, Cascader, Form, Select } from 'antd';
import cn from 'classnames';
import { useSelector, useDispatch } from 'umi';
import { useForm } from 'antd/es/form/Form';
import moment from 'moment';
import Amap from '@/common/components/Amap';
import ToolBar from '@/common/components/UseInMap/ToolBar';
import styles from './style.less';
import Iconfont from '@/common/components/IconFont';
import CustomMarkerHtml from '@/common/components/UseInMap/CustomMarker';
import LevelBar from '@/common/components/UseInMap/LevelBar';
import useMapShiftBar from '@/common/components/UseInMap/MapShiftBar';
import DataQuery from './dataQuery';
import Statistic from './statistic';
import Case from './case';
import { getQueryDay, getCityList } from '@/common/api';
import useMarkerTooltip from '@/common/components/UseInMap/useMarkerTooltip';
import useStateCallback from '@/common/hooks/useStateCallback';

const { TabPane } = Tabs;

const areaOptions = [
  { label: '行政区域', value: 'xx' },
  { label: '地理分区', value: 'yy' },
];

const now = moment();
function FilterBar(props: any) {
  const { onFilter } = props;
  const [form] = useForm();
  const [visible, setVisible] = useState<boolean>(true);
  const handleShiftVisible = useCallback(
    () => setVisible((value) => !value),
    [],
  );
  const [areaList, setAreaList] = useStateCallback<any[]>([]);
  const handleFilter = useCallback(async () => {
    const data = await form.validateFields();
    onFilter({
      ...data,
      areaItem: areaList.find((item) => item.code === data.area),
    });
  }, [onFilter, form, areaList]);

  useEffect(() => {
    getCityList({ pid: '510000' }).then((res) => {
      setAreaList(
        (res || [])?.map(({ code, name, ...other }) => ({
          ...other,
          code,
          name,
          label: name,
          value: code,
        })),
        async (areaList) => {
          const data = await form.getFieldsValue();
          form.setFieldsValue({ area: areaList[0].code });
          props.onFilter({ ...data, areaItem: areaList[0].code });
        },
      );
    });
  }, []);

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
      <Form form={form} initialValues={{ date: now }}>
        <div
          className={cn(styles.filterBox, visible ? styles.activeFilter : '')}
        >
          <div className={styles.searchItem}>
            <span className={styles.label}>时间</span>
            <Form.Item
              name="date"
              className={styles.content}
              rules={[{ required: true, message: '请选择时间' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                value={now}
                defaultValue={now}
              />
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
              <Form.Item
                name="area"
                rules={[{ required: true, message: '请选择地区' }]}
              >
                <Select options={areaList} />
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

function Home() {
  const AmapRef = useRef<any>();
  const mapRef = useRef<AMap.Map>();
  const satelliteLayer = useRef<AMap.TileLayer.Satellite>();
  const preMarkerList = useRef<AMap.Marker[]>([]);
  const [isSatellite, MapShiftBar] = useMapShiftBar();
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [hideLevel, setHideLevel] = useState<number[]>([]);
  const [markList, setMarkList] = useState<any[]>([]);
  // const [activeKey, setActiveKey] = useState<string>('1');
  const [dom, handleShow, handleCloseTooltip] = useMarkerTooltip('HOMEMAP');
  const dispatch = useDispatch();
  const { activeKey } = useSelector((state: any) => state.detection);
  // 地图加载好后回调
  const handleLoadMap = useCallback(
    (AMap, map) => {
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
      map.on('zoomchange', handleCloseTooltip);
      setMapReady(true);
    },
    [handleCloseTooltip],
  );

  // 点击自定义标签
  const handleClickMarker = useCallback(
    (e) => {
      const data = e.target.getExtData(); // 获取到对应坐标的数据
      const { x, y, offsetX, offsetY } = e.originEvent;
      handleShow({ x: x - offsetX, y: y - offsetY, data });
      // todo 点击显示弹窗内容
    },
    [handleShow],
  );

  const handleFilter = useCallback((search) => {
    const { areaItem, date } = search;
    const { code, level } = areaItem;
    getQueryDay({
      code,
      level,
      time: moment(date).format('YYYY-MM-DD'),
    }).then(({ data }) => setMarkList(data || []));
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
      handleCloseTooltip();
      markerList.map((instance) => instance.on('click', handleClickMarker));
      preMarkerList.current = markerList;
      mapRef.current!.add(markerList);
    }
  }, [mapReady, markList, hideLevel, handleCloseTooltip]);

  return (
    <Tabs
      className={styles.TabsView}
      activeKey={activeKey}
      onChange={(key) => {
        dispatch({ type: 'detection/setActiveKey', payload: key });
      }}
    >
      <TabPane tab="火险等级" key="1">
        <div className={styles.mapView}>
          <Amap mapId="HOMEMAP" onLoadCallback={handleLoadMap} />
          <LevelBar onChange={setHideLevel} />
          <ToolBar />
          <FilterBar onFilter={handleFilter} />
          {MapShiftBar}
          {dom}
        </div>
      </TabPane>
      <TabPane tab="数据查询" key="2">
        <DataQuery />
      </TabPane>
      <TabPane tab="统计分析" key="3">
        <Statistic />
      </TabPane>
      <TabPane tab="案例库" key="4">
        <Case />
      </TabPane>
    </Tabs>
  );
}

export default Home;
