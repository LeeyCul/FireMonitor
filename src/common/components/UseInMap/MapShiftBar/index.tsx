import { useCallback, useState, useMemo } from 'react';
import Iconfont from '../../IconFont';
import styles from './style.less';

export default function useMapShiftBar(): [
  isSatellite: boolean,
  dom: React.ReactElement,
] {
  const [isSatellite, setSatellite] = useState<boolean>(false);
  const handleShit = useCallback((value) => {
    setSatellite(value);
  }, []);
  const dom = useMemo(() => {
    return (
      <div className={styles.mapBar}>
        <div className={styles.mapBox} onClick={handleShit.bind(null, false)}>
          <Iconfont
            type="iconpingmianditu"
            style={{ color: !isSatellite ? '#0095FB' : undefined }}
          />
          <p style={{ color: !isSatellite ? '#0095FB' : undefined }}>行政图</p>
        </div>
        <div className={styles.mapBox} onClick={handleShit.bind(null, true)}>
          <Iconfont
            type="iconweixing"
            style={{ color: isSatellite ? '#0095FB' : undefined }}
          />
          <p style={{ color: isSatellite ? '#0095FB' : undefined }}>卫星图</p>
        </div>
      </div>
    );
  }, [isSatellite]);

  return [isSatellite, dom];
}
