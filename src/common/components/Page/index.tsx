import React, { ReactChildren, ReactNode } from 'react';
import styles from './style.less';

type Props = {
  children: ReactChildren | ReactNode;
};

const Page: React.FC<Props> = ({ children }) => (
  <div className={styles.PageConainer}>{children}</div>
);

export default Page;
