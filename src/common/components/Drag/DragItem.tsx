import IconFont from '@/common/components/IconFont';
import styles from './dragItem.less';

interface Props {
  title: string;
  onDragStart: () => void;
  onDragEnd: () => void;
  handleDel?: () => void;
  showIcon?: boolean;
}

function DragItem({
  title,
  showIcon,
  onDragStart,
  onDragEnd,
  handleDel,
}: Props) {
  return (
    <div
      draggable="true"
      className={styles.dragItemView}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <span>{title}</span>
      {showIcon && <IconFont type="iconclose" size={14} onClick={handleDel} />}
    </div>
  );
}

export default DragItem;
