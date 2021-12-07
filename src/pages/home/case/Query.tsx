import { Form, Input, Button, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import dayjs from 'dayjs';
import Iconfont from '@/common/components/IconFont';

const { RangePicker } = DatePicker;

function Query(props: { onSearch: (params: any) => void }) {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    const { createdAt, name } = values;
    let result: any = {};
    if (createdAt) {
      result.createAtStart = dayjs(createdAt[0]).format('YYYY-MM-DD');
      result.createAtEnd = dayjs(createdAt[1]).format('YYYY-MM-DD');
    }
    if (name) {
      result.name = name;
    }
    props.onSearch(result);
  };
  const handleReset = useCallback(() => {
    form.resetFields();
    props.onSearch({});
  }, []);
  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
    >
      <Form.Item name="name" label="案例名">
        <Input placeholder="请输入内容" />
      </Form.Item>
      <Form.Item name="createdAt" label="创建时间">
        <RangePicker />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              查询
            </Button>
            &emsp;
            <Button
              icon={<Iconfont type="iconrefresh" size={12} />}
              onClick={handleReset}
            >
              重置
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  );
}

export default Query;
