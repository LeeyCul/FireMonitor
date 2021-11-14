import React from 'react';
import { Spin } from 'antd';

function Loading() {
  return (
    <div style={{ width: '100%' }}>
      <Spin />
    </div>
  );
}

export default Loading;
