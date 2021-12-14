import { Form, Input, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { SearchOutlined } from '@ant-design/icons';
import Iconfont from '@/common/components/IconFont';

const { RangePicker } = DatePicker;
interface QueryProps {
  onchange?: (value: any) => void;
  onResetFields?: () => void;
}

function Query({ onchange, onResetFields }: QueryProps) {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    const { time, name } = values || {};
    const startTime = time?.[0] ? dayjs(time?.[0])?.format('YYYY-MM-DD') : null;
    const endTime = time?.[0] ? dayjs(time?.[1])?.format('YYYY-MM-DD') : null;
    onchange?.(_.pickBy({ startTime, endTime, name }));
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
      <Form.Item name="time" label="时间范围">
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
              onClick={() => {
                form.resetFields();
                onResetFields?.();
              }}
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
