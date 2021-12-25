import React, { ReactNode } from 'react';
import { Table, Alert, PaginationProps } from 'antd';
import styles from './styles.less';

interface Props {
  /* 列 */
  columns: any[];
  /* 数据 */
  dataSource: any[];
  /* 行大小 */
  size?: 'default' | 'middle' | 'small';
  /* 表格行 key 的取值，可以是字符串或一个函数 */
  rowKey?: string | ((record: any) => string);
  /* 多选扩展 */
  multipleExtendNode?: string | ReactNode;
  /* 表格行是否可选择 */
  rowSelection?: object;
  /* 显示Alert */
  showAlert?: boolean;
  loading?: boolean;
  clsName?: string;
  pagination?: PaginationProps;
}

const CustomTable: React.FC<Props> = (props) => {
  const {
    columns,
    dataSource,
    size,
    pagination,
    rowKey,
    multipleExtendNode,
    rowSelection,
    showAlert,
    clsName,
    loading,
  } = props;
  const rowClassName = (_record: any, index: number) =>
    index % 2 === 0 ? styles.even : '';
  const columnsList = columns?.map((item) => ({
    ...item,
    className: styles.tabheadler,
  }));
  const random = Math.random().toString(36).substring(2, 6);
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
        loading={loading}
        columns={columnsList}
        dataSource={dataSource}
        rowKey={rowKey || random}
        size={size as any}
        rowClassName={rowClassName}
        pagination={pagination}
        rowSelection={rowSelection}
      />
    </div>
  );
};

CustomTable.defaultProps = {
  size: 'small',
  showAlert: false,
};

export default CustomTable;
