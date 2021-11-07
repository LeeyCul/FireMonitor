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
      <Form.Item name="username" label="时间范围">
        <RangePicker style={{ width: 160 }} />
      </Form.Item>
      <Form.Item name="password" label="台站">
        <Select showSearch style={{ width: 120 }} placeholder="请选择" />
      </Form.Item>
      <Form.Item name="password2" label="区域类型">
        <Select showSearch style={{ width: 120 }} placeholder="请选择">
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </Form.Item>
      <Form.Item name="password3">
        <Select showSearch style={{ width: 120 }} placeholder="请选择">
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </Form.Item>
      <Form.Item name="password3" label="计算标准">
        <Select showSearch style={{ width: 100 }} placeholder="请选择">
          <Option value="jack">国标</Option>
          <Option value="lucy">Lucy</Option>
        </Select>
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
