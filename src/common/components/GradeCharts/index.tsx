import { useEffect, memo, useCallback } from 'react';
import { train, grid, plot } from '@sakitam-gis/kriging';
import html2canvas from 'html2canvas';
import GeoJson from './sichuan.json';
import { colors } from './constant';
import sichuanPng from './sichuanT.png';
import styles from './style.less';

interface DataProps {
  value: number;
  lng: number;
  lat: number;
}

interface Props {
  data: DataProps[];
  getImgUrl?: (url: string) => void;
  delay?: number;
}

function index({ data, getImgUrl, delay }: Props) {
  const xlim = [97.350096, 108.546488];
  const ylim = [26.045865, 34.312446];

  const getSigleValue = (name: string) => {
    const result = data?.map((item) => item[name as keyof DataProps]);
    return result;
  };
  const valueArr = getSigleValue('value') || [];
  const lng = getSigleValue('lng') || [];
  const lat = getSigleValue('lat') || [];
  const area = GeoJson.features[0].geometry.coordinates[0];

  const getCanvas = useCallback(() => {
    const ele: any = document.getElementById('canvasMap');
    if (ele) {
      let img = new Image();
      img.src = sichuanPng;
      img.onload = () => {
        // 用克里金训练一个variogram对象
        ele.width = img.width || 886;
        ele.height = img.height || 753;
        let variogram = train(valueArr, lng, lat, 'exponential', 0, 100);
        let grids = grid(area, variogram, (ylim[1] - ylim[0]) / 250);
        // 将得到的格网预测值渲染到canvas画布上
        plot(ele, grids as any, [xlim[0], xlim[1]], [ylim[0], ylim[1]], colors);
      };
    }
  }, [data]);

  useEffect(() => {
    Promise.resolve(getCanvas()).then(() => {
      setTimeout(() => {
        htmlToImg();
      }, delay || 300);
    });
  }, [data]);

  const htmlToImg = () => {
    let container = document.getElementById('container');
    if (container) {
      html2canvas(container).then((canvas) => {
        getImgUrl?.(canvas.toDataURL('image/png'));
      });
    }
  };

  return (
    <>
      {data?.length && (
        <div className={styles.canvasView} id="container">
          <canvas id="canvasMap" className={styles.canvas} />
          <img
            src={sichuanPng}
            alt=""
            className={styles.bg}
            width={886}
            height={753}
          />
        </div>
      )}
    </>
  );
}

export default memo(index);
