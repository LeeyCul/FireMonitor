import React from 'react';
import styles from './style.less';

type Props = {
  level?: number;
};
type Info = {
  text?: string;
  color?: string;
};

function LevelTag({
  level = 0,
  text = '一级',
  color = '#43CF7C',
}: Props & Info) {
  const levelTagObj = [
    { text: '一级', color: '#43CF7C' },
    { text: '二级', color: '#2E5AFA' },
    { text: '三级', color: '#E8DE1F' },
  ];
  const renderText = React.useMemo(() => {
    let infoObj: Info;
    if (level) {
      infoObj = {
        text: levelTagObj[level]?.text,
        color: levelTagObj[level]?.color,
      };
    } else {
      infoObj = {
        text,
        color,
      };
    }
    return infoObj;
  }, [level, Text, color]);
  return (
    <div className={styles.levelTag} style={{ background: renderText?.color }}>
      {renderText?.text}
    </div>
  );
}

export default LevelTag;
