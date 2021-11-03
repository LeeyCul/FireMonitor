import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import Iconfont from '../../common/components/IconFont';
import logo from '@/common/images/logo.png';
import styles from './style.less';

function Header() {
  const [time, setTime] = useState<string>();
  let timer = useRef<any>();

  const getCurrentTime = () => {
    timer.current = setInterval(() => {
      setTime(dayjs().format('YYYY年MM月DD日 HH:mm:ss'));
    }, 1000);
  };

  useEffect(() => {
    getCurrentTime();
    return () => {
      clearInterval(timer.current);
    };
  }, [getCurrentTime]);

  return (
    <div className={styles.healderConainer}>
      <div className={styles.logoView}>
        <img src={logo} alt="" className={styles.logo} />
        <div className={styles.titleText}>森林火险气象监测预测系统</div>
      </div>
      <div className={styles.baseInfoView}>
        <div className={styles.dataUpdateTime}>
          <Iconfont type="iconshuaxin" size={14} />
          &nbsp; 数据更新：
          {time}
        </div>
        <div className={styles.userInfo}>
          <Iconfont type="iconyonghu-yuan" size={18} />
          &nbsp; 用户名
        </div>
        <div className={styles.logout}>
          <Iconfont type="iconlogout" size={20} />
          &nbsp; 退出
        </div>
      </div>
    </div>
  );
}

export default Header;
