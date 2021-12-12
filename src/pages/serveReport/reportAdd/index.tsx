import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { history } from 'umi';
import { RightOutlined } from '@ant-design/icons';
import Iconfont from '@/common/components/IconFont';
import Pgae from '@/common/components/Page';
import LeftBaseInfo from './LeftBase';
import styles from './style.less';

function index() {
  return (
    <div className={styles.conainerView}>
      <Pgae clsName={styles.headerView}>
        <div className={styles.title}>
          <Iconfont type="iconimage-text" />
          &nbsp;
          <span>数据服务</span>
          <RightOutlined className={styles.icon} />
          <span className={styles.currentText}>新建专题报告</span>
        </div>
        <Button
          type="primary"
          className={styles.btn}
          onClick={() => history.goBack()}
        >
          返回
        </Button>
      </Pgae>
      <Pgae clsName={styles.content}>
        <LeftBaseInfo />
        <div className={styles.rightView}>
          <div className={styles.title}>
            <div className={styles.titleText}>
              <Iconfont type="iconimage-text" />
              &nbsp; 生成结果
            </div>
            <div className={styles.btnView}>
              <Button>保存</Button>
              <Button className={styles.btn}>下载</Button>
              <Button>打印</Button>
            </div>
          </div>
          <div className={styles.reportView}>
            <div>《内部资料》</div>
            <div className={styles.titleT}>每月森林草原火险气象等级预测</div>
            <Input className={styles.InputNum} />
            <div className={styles.adress}>
              <Input className={styles.Inputadress} />
              <Input className={styles.Inputadress} />
            </div>
            <Input className={styles.InputTitle} />
            <Input.TextArea rows={6} className={styles.textArea} />
            <Input.TextArea rows={6} className={styles.textArea} />
          </div>
        </div>
      </Pgae>
    </div>
  );
}

export default index;
