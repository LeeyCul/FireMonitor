import { useEffect, useState } from 'react';
import { Cascader, Form } from 'antd';
import { getCityList } from '@/common/api';

const topList = [
  { label: '行政区域', value: '行政区域' },
  { label: '地理分区', value: '地理分区' },
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
  return (
    <Form.Item
      label="区域类型"
      name="areaType"
      wrapperCol={{ span: 20 }}
      {...(props || {})}
    >
      <Cascader options={data} />
    </Form.Item>
  );
}
