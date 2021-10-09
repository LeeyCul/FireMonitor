import React, { useEffect } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import { BasicConstants } from '@/common/constant';
import styles from './style.less';

function Home() {
  useEffect(() => {
    // entry();
    AMapLoader.load({
      key: BasicConstants.MapKey, // 必填
      version: '1.4.15',
      plugins: ['AMap.Scale', 'AMap.ToolBar'],
      AMapUI: {
        version: '1.1',
        plugins: ['control/BasicControl', 'overlay/SimpleMarker'],
      },
    })
      .then((AMap) => {
        let map = new AMap.Map('conainer', {
          zoom: 6,
        });
        new AMapUI.BasicControl.Zoom({
          showZoomNum: true,
          position: 'rt',
          theme: 'dark',
        });
        console.log('object', new AMapUI.BasicControl.Zoom());
        map.addControl(new AMap.Scale());
        map.addControl(new AMap.ToolBar());
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  async function entry() {
    const amapLoader = await AMapLoader.load({
      key: BasicConstants.MapKey,
      version: '1.4.15',
      Loca: { version: '1.3.2' },
      plugins: ['AMap.ToolBar'],
    });

    console.log('AMap', window);
    const a = new window.AMap.ToolBar();
    const map = new window.AMap.Map('conainer', {
      zoom: 6,
      center: [102.796654, 30.001704],
    });
    map.addControl(a);
    console.log('map', map.addControl);
    // 创建可视化图层——绘制散点图层
    const layer = new Loca.HeatmapLayer({
      map,
    });

    // 传入原始数据
    layer.setData(
      [
        {
          lnglat: '107.501062,31.213522',
          i: 900,
        },
        {
          lnglat: '105.445131,28.882889',
          i: 1100,
        },
        {
          lnglat: '104.080989,30.657689',
          i: 400,
        },
        {
          lnglat: '103.003398,29.981831',
          i: 1900,
        },
      ],
      {
        lnglat: 'lnglat', // 指定坐标数据的来源，数据格式: 经度在前，维度在后，数组格式。
      },
    );

    // 配置样式
    layer.setOptions({
      unit: 'px',
      style: {
        radius: 30, // 圆形半径，单位像素
        color: 'red', // 填充颜色
        borderWidth: 40, // 边框宽度
        borderColor: '#14B4C9', // 边框颜色
      },
    });

    // 数据渲染
    layer.render();
  }

  return (
    <div className={styles.conainer} id="conainer">
      1
      {/* <iframe
        src="https://maplab.amap.com/share/mapv/d17012314a91523989635d0e50d62fc5"
        style={{ height: '100%', width: '100%' }}
      /> */}
    </div>
  );
}

export default Home;
