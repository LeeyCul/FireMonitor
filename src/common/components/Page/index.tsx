import React, { ReactChildren, ReactNode } from 'react';
import Iconfont from '../IconFont';
import styles from './style.less';

type Props = {
  children: ReactChildren | ReactNode;
  title?: string;
  icon?: string;
};

const Page: React.FC<Props> = ({ children, title, icon }) => (
  <div className={styles.PageConainer}>
    {(title || icon) && (
      <div className={styles.titleView}>
        <Iconfont type={icon as string} />
        &nbsp;
        {title}
      </div>
    )}
    {children}
  </div>
);

export default Page;
