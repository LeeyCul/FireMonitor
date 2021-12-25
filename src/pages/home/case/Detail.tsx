import cn from 'classnames';
import { useEffect, useState } from 'react';
import { getCaseDetail } from '@/common/api';
import styles from './style.less';
import DetailPage from './detailPage';

interface Props {
  visible: boolean;
  id: number | null;
  onClose: () => void;
}

export default function (props: Props) {
  const { visible, id, onClose } = props;
  const [data, setData] = useState<any>({});
  useEffect(() => {
    if (id && visible) {
      getCaseDetail(id).then(({ data }) => {
        setData(data);
      });
    }
  }, [id, visible]);
  return (
    <div className={cn(styles.detail, visible ? styles.showDetail : '')}>
      <DetailPage data={data} onClose={onClose} />
    </div>
  );
}
