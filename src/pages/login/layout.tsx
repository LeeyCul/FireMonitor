import React from 'react';
import { Layout, Card } from 'antd';
import Login from './index';
import logo from '@/common/images/logo.png';
import loginB from '@/common/images/loginB.png';
import '@/common/utils/postPxToRem';
import styles from './style.less';

const { Content } = Layout;

const LoginPage: React.FC = () => (
  <Layout className={styles.loginView}>
    <Content
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card className={styles.loginContent}>
        <div style={{ marginBottom: 30, textAlign: 'center' }}>
          <h3 className={styles.title}>
            <img src={logo} alt="" className={styles.logo} />
            森林火险气象监测预测系统
          </h3>
          <div className={styles.loginCard}>
            <img src={loginB} alt="" className={styles.loginB} />
            <Login />
          </div>
        </div>
      </Card>
    </Content>
  </Layout>
);
export default LoginPage;
