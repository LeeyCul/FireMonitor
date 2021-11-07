import React, { ReactNode } from 'react';
import { Table, Alert } from 'antd';
import styles from './styles.less';

interface Props {
  /* 列 */
  columns: any[];
  /* 数据 */
  dataSource: any[];
  /* 行大小 */
  size?: 'default' | 'middle' | 'small';
  /* 是否可以快速跳转至某页 */
  showQuickJumper?: boolean;
  /* 只有一页时是否隐藏分页器 */
  hideOnSinglePage?: boolean;
  /* 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数 */
  onChange?: () => void;
  /* pageSize */
  onShowSizeChange?: () => void;
  /* 表格行 key 的取值，可以是字符串或一个函数 */
  rowKey?: string | ((record: any) => string);
  /* 多选扩展 */
  multipleExtendNode?: string | ReactNode;
  /* 表格行是否可选择 */
  rowSelection?: object;
  /* 显示Alert */
  showAlert?: boolean;
  clsName?: string;
}

const CustomTable: React.FC<Props> = (props) => {
  const {
    columns,
    dataSource,
    size,
    showQuickJumper,
    hideOnSinglePage,
    onChange,
    onShowSizeChange,
    rowKey,
    multipleExtendNode,
    rowSelection,
    showAlert,
    clsName,
  } = props;
  const rowClassName = (_record: any, index: number) =>
    index % 2 === 0 ? styles.even : '';
  const columnsList = columns?.map((item) => ({
    ...item,
    className: styles.tabheadler,
  }));
  return (
    <div className={clsName}>
      {showAlert && (
        <Alert
          className={styles.alert}
          message={multipleExtendNode}
          type="info"
        />
      )}
      <Table
        columns={columnsList}
        dataSource={dataSource}
        rowKey={rowKey}
        size={size as any}
        rowClassName={rowClassName}
        pagination={{
          showQuickJumper,
          hideOnSinglePage,
          onChange,
          onShowSizeChange,
        }}
        rowSelection={rowSelection}
      />
    </div>
  );
};

CustomTable.defaultProps = {
  size: 'small',
  showQuickJumper: false,
  hideOnSinglePage: true,
  showAlert: false,
};

export default CustomTable;
