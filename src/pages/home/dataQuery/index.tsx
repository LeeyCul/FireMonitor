import React from 'react';
import { Table } from 'antd';
import Page from '@/common/components/Page';
import styles from './style.less';

function index() {
  return (
    <>
      <Page clsName={styles.dataQueryView}>
        111
        <hr className={styles.line} />
        <Page
          icon="iconsousuojieguo"
          title={
            <div>
              查询结果
              <span className={styles.updateTime}>更新于2021-11-12 12:00</span>
            </div>
          }
          style={{ paddingLeft: 0, margin: 0 }}
        >
          1
        </Page>
      </Page>
    </>
  );
}

export default index;
