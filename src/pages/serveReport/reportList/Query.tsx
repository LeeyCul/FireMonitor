import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Iconfont from '@/common/components/IconFont';

const { RangePicker } = DatePicker;

interface QueryProps {
  onchange?: (value: any) => void;
}

function Query({ onchange }: QueryProps) {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    onchange?.(values);
  };
  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
    >
      <Form.Item name="name" label="报告名称">
        <Input />
      </Form.Item>
      <Form.Item name="username" label="时间范围">
        <RangePicker style={{ width: 200 }} />
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
              onClick={() => form.resetFields()}
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
