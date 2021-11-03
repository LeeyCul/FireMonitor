import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

interface Props {
  type: string;
  style?: React.CSSProperties;
  size?: string | number;
}

function Iconfont({ type, style, size }: Props) {
  const IconUrl = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2911369_ril2ddb5lt.js', // 在 iconfont.cn 上生成
  });
  return (
    <IconUrl
      type={type}
      width={32}
      height={32}
      style={style || { fontSize: size || '20px' }}
    />
  );
}
export default Iconfont;
