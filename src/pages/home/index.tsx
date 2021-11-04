import { Tabs } from 'antd';
import Amap from '@/common/components/Amap';
import Page from '@/common/components/Page';
import styles from './style.less';

const { TabPane } = Tabs;

function Home() {
  function callback(key: string) {
    console.log(key);
  }
  return (
    <div className={styles.conainer} id="conainer">
      <Tabs
        defaultActiveKey="1"
        onChange={callback}
        className={styles.TabsView}
      >
        <TabPane tab="火险等级" key="1">
          <div className={styles.mapView}>
            <Amap mapId="HOMEMAP" />
          </div>
        </TabPane>
        <TabPane tab="数据查询" key="2">
          <Page title="数据查询" icon="icondata">
            数据查询
          </Page>
        </TabPane>
        <TabPane tab="统计分析" key="3">
          <Page>统计分析</Page>
        </TabPane>
        <TabPane tab="案例库" key="4">
          <Page>案例库</Page>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Home;
