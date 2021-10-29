import React, { ReactChildren } from 'react';
import { Layout } from 'antd';
import Healder from './header';
import MenuNav from './menuNav';
import styles from './style.less';
import '@/common/utils/postPxToRem';

type Props = {
  children: ReactChildren;
};

const { Sider } = Layout;

const Layouts: React.FC<Props> = ({ children }) => (
  <div className={styles.rootView}>
    <Healder />
    <Layout>
      <Sider trigger={null}>
        <MenuNav />
      </Sider>
      <div className={styles.contentView}>{children}</div>
    </Layout>
  </div>
);

export default Layouts;
