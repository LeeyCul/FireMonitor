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
  level = 1,
  text = '一级',
  color = '#43CF7C',
}: Props & Info) {
  const levelTagObj = [
    { text: '一级', color: '#72B047' },
    { text: '二级', color: '#DCDCDC' },
    { text: '三级', color: '#E8DE1F' },
    { text: '四级', color: '#F87E06' },
    { text: '五级', color: '#F60109' },
  ];
  const renderText = React.useMemo(() => {
    let infoObj: Info;
    if (level) {
      infoObj = {
        text: levelTagObj?.[level - 1]?.text,
        color: levelTagObj?.[level - 1]?.color,
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
