import Amap from '@/common/components/Amap';
import Icon from '@/common/components/IconFont';
import styles from './style.less';

function Home() {
  return (
    <div className={styles.conainer} id="conainer">
      <Icon type="icon-fenxi1" />
      <Amap mapId="HOMEMAP" />
    </div>
  );
}

export default Home;
