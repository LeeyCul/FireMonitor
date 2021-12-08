import { Button } from 'antd';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import styles from './style.less';

interface Props {
  visible: boolean;
  id: number | undefined;
  onClose: () => void;
}

export default function (props: Props) {
  const { visible, id, onClose } = props;
  const [data, setData] = useState<any>({});
  useEffect(() => {
    if (id && visible) {
      // todo 获取详情
    }
  }, [id, visible]);
  return (
    <div className={cn(styles.detail, visible ? styles.showDetail : '')}>
      <div>
        <Button onClick={onClose}>返回</Button>
      </div>
    </div>
  );
}
