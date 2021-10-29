import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

interface Props {
  type: string;
  style?: React.CSSProperties;
}

function Iconfont({ type, style }: Props) {
  const IconUrl = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2299877_r9i3z1l42xa.js', // 在 iconfont.cn 上生成
  });
  return (
    <IconUrl
      type={type}
      width={32}
      height={32}
      style={style || { fontSize: '20px' }}
    />
  );
}
export default Iconfont;
