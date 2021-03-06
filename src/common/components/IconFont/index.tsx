import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

interface Props {
  type: string;
  style?: React.CSSProperties;
  size?: string | number;
  onClick?: () => void;
}

function Iconfont({ type, style, size, onClick }: Props) {
  const IconUrl = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2911369_gvmhs6jyhvj.js', // ε¨ iconfont.cn δΈηζ
  });
  return (
    <IconUrl
      type={type}
      width={32}
      height={32}
      onClick={onClick}
      style={style || { fontSize: size || '20px' }}
    />
  );
}
export default Iconfont;
