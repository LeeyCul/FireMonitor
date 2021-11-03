import React from 'react';
import { Button } from 'antd';
import styles from './style.less';

function index() {
  return (
    <div className={styles.conainerView}>
      <div>
        <Button>新建2</Button>
        <Button>下载</Button>
      </div>
    </div>
  );
}

export default index;
