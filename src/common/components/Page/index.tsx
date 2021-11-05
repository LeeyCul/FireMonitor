import React, { ReactChildren, ReactNode, CSSProperties } from 'react';
import cls from 'classnames';
import Iconfont from '../IconFont';
import styles from './style.less';

type Props = {
  children: ReactChildren | ReactNode;
  title?: string | ReactNode;
  icon?: string;
  clsName?: string;
  style?: CSSProperties;
};

const Page: React.FC<Props> = ({ children, title, icon, clsName, style }) => (
  <div className={cls(styles.PageConainer, clsName)} style={style}>
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
