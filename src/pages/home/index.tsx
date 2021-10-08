import React from 'react';
import styles from './style.less';

function Home() {
  return (
    <div className={styles.conainer}>
      <iframe
        src="https://maplab.amap.com/share/mapv/d17012314a91523989635d0e50d62fc5"
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
}

export default Home;
