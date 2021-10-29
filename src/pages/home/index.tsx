import Amap from '@/common/components/Amap';
import styles from './style.less';

function Home() {
  return (
    <div className={styles.conainer} id="conainer">
      <Amap mapId="HOMEMAP" />
    </div>
  );
}

export default Home;
