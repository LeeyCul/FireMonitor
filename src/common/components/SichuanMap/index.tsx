import { useEffect, useRef } from 'react';
import * as ehcarts from 'echarts';
import geoJSON from '@/common/constant/geoJson.json';

interface Props {
  onGetImage?: (base64: string) => void;
}

export default function SiChuanMap(props: Props) {
  const mapRef = useRef<HTMLDivElement>();
  useEffect(() => {
    if (mapRef.current) {
      const instance = ehcarts.init(mapRef.current);
      ehcarts.registerMap('SC', geoJSON);
      instance.setOption({
        title: {
          text: '四川省森林火险等级月平均',
        },
        visualMap: {
          min: -30,
          max: 50,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered'],
          },
        },
        series: [
          {
            name: '四川省森林火险等级月平均',
            type: 'map',
            map: 'SC',
            label: {
              show: true,
            },
            data: [
              { name: '成都市', value: 20 },
              { name: '自贡市', value: 40 },
              { name: '攀枝花市', value: 10 },
              { name: '泸州市', value: -12 },
              { name: '德阳市', value: 2 },
              { name: '绵阳市', value: 19 },
              { name: '广元市', value: -2 },
              { name: '遂宁市', value: 11 },
              { name: '内江市', value: 5 },
              { name: '乐山市', value: 8 },
              { name: '南充市', value: 9 },
              { name: '眉山市', value: 2 },
              { name: '宜宾市', value: 28 },
              { name: '广安市', value: 45 },
              { name: '达州市', value: 9 },
              { name: '雅安市', value: 3 },
              { name: '巴中市', value: -22 },
              { name: '资阳市', value: 47 },
              { name: '阿坝藏族羌族自治州', value: 11 },
              { name: '甘孜藏族自治州', value: 22 },
              { name: '凉山彝族自治州', value: -11 },
            ],
          },
        ],
      });
      props.onGetImage && props.onGetImage(instance.getDataURL());
    }
  }, [props.onGetImage]);

  return <div id="map" ref={mapRef} style={{ width: 400, height: 400 }} />;
}
