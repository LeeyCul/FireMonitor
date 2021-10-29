import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
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
      <div>logo</div>
      <div>
        <div>{time}</div>
      </div>
    </div>
  );
}

export default Header;
