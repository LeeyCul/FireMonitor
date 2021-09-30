import React, { ReactChildren } from 'react';
import Healder from './header';
import styles from './style.less';
import '@/common/utils/postPxToRem';

type Props = {
  children: ReactChildren;
};

const Layouts: React.FC<Props> = ({ children }) => (
  <div className={styles.rootView}>
    <Healder />
    <div className={styles.contentView}>{children}</div>
  </div>
);

export default Layouts;
