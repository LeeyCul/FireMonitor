import { useCallback, useState } from 'react';
import { LevelList } from '@/common/constant';
import styles from './style.less';

interface Props {
  onChange: (value: number[]) => void;
}

export default function LevelBar(props: Props) {
  const [disableList, setDisableList] = useState<number[]>([]);
  const handleShift = useCallback(
    (index: number) => {
      const key: number = disableList.indexOf(index);
      const copy: number[] = disableList.slice();
      if (key > -1) {
        copy.splice(key, 1);
      } else {
        copy.push(index);
      }
      setDisableList(copy);
      props.onChange(copy);
    },
    [disableList, props],
  );

  return (
    <div className={styles.levelBar}>
      <div>等级：</div>
      {LevelList.map(({ color: backgroundColor, text }, index) => {
        const disable = disableList.includes(index + 1);
        return (
          <div
            key={index}
            className={styles.levelBox}
            onClick={handleShift.bind(null, index + 1)}
          >
            <span
              className={styles.colorTag}
              style={{ backgroundColor: disable ? '#DCDCDC' : backgroundColor }}
            />
            <span style={{ color: disable ? '#DCDCDC' : '' }}>{text}</span>
          </div>
        );
      })}
    </div>
  );
}
