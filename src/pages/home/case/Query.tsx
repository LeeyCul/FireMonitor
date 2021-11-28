import React from 'react';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import { SearchOutlined, LockOutlined } from '@ant-design/icons';
import Iconfont from '@/common/components/IconFont';

const { RangePicker } = DatePicker;
const { Option } = Select;

function Query() {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Finish:', values);
  };
  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
    >
      <Form.Item name="password" label="案例名">
        <Input style={{ width: 120 }} placeholder="请输入内容" />
      </Form.Item>
      <Form.Item name="username" label="创建时间">
        <RangePicker style={{ width: 160 }} />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              查询
            </Button>
            &emsp;
            <Button icon={<Iconfont type="iconrefresh" size={12} />}>
              重置
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  );
}

export default Query;
