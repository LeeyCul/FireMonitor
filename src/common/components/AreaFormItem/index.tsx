import { useEffect, useState } from 'react';
import { Cascader, Form } from 'antd';
import { getCityList } from '@/common/api';

const topList = [
  { label: '行政区域', value: 0 },
  { label: '地理分区', value: 1 },
];

export default function AreaFormItem(props: any) {
  const [data, setData] = useState<any[]>();
  useEffect(() => {
    getCityList({ pid: '510000' }).then((res) => {
      const children = (res || [])?.map(({ code, name, ...other }) => ({
        ...other,
        code,
        name,
        label: name,
        value: code,
      }));
      setData(topList.map((item) => ({ ...item, children })));
    });
  }, []);
  // todo 升级或者修改
  return (
    <Form.Item
      label="区域类型"
      name="areaList"
      wrapperCol={{ span: 20 }}
      {...(props || {})}
    >
      <Cascader multiple options={data} />
    </Form.Item>
  );
}
