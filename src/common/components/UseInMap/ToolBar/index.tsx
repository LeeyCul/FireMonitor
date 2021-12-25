import { useCallback, useState } from 'react';
import Iconfont from '../../IconFont';
import styles from './style.less';

export default function ToolBar() {
  const [show, setShow] = useState<boolean>(false);

  const handleShowData = useCallback(() => {}, []);
  const handleDownload = useCallback(() => {}, []);
  return (
    <>
      <div className={styles.toolBar}>
        <div className={styles.toolBox} onClick={handleShowData}>
          <Iconfont type="iconshuju" />
          <p>数据</p>
        </div>
        <div className={styles.toolBox} onClick={handleDownload}>
          <Iconfont type="iconbottom" />
          <p>下载</p>
        </div>
      </div>
      <div></div>
    </>
  );
}
