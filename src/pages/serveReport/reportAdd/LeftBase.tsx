import { useState } from 'react';
import { Form, Input, DatePicker, Button, Select, TreeSelect } from 'antd';
import styles from './style.less';

const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const BaseInfo = () => {
  const [formData1, setFormData1] = useState<object>({});
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };
  const onValuesChange = (value: any, allValues: any) => {
    setFormData1(allValues);
  };
  console.log('formData1', formData1);
  return (
    <div className={styles.leftView}>
      <Form
        form={form}
        colon={false}
        {...layout}
        name="nest-messages"
        onValuesChange={onValuesChange}
      >
        <Form.Item name="title" label="专题名称">
          <Input />
        </Form.Item>
        <Form.Item name="number" label="期 数">
          <Input />
        </Form.Item>
        <Form.Item name="pe" label="签发人">
          <Input />
        </Form.Item>
        <Form.Item name="dataSource" label="来 源">
          <Input />
        </Form.Item>
        <Form.Item name="range-picker" label="实况时间">
          <RangePicker />
        </Form.Item>
        <Form.Item name="range-picker1" label="预测时间">
          <RangePicker />
        </Form.Item>
        <div className={styles.formsty}>
          <Form.Item name="level1" label="区域类型" labelCol={{ span: 7 }}>
            <Select
              defaultValue="1"
              style={{ width: 100, marginLeft: '6px' }}
              placeholder="请选择"
              // onChange={(value) => {
              // // dispatch({ type: 'detection/getCityData', payload: 0 });
              // }}
            >
              <Select.Option value="o1">行政区域</Select.Option>
              <Select.Option value="o2">地理区域</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="type12" labelCol={{ span: 2 }}>
            <Select
              defaultValue="1"
              style={{ width: 100 }}
              placeholder="请选择"
              onChange={(value) => {
                // dispatch({ type: 'detection/getCityData', payload: 0 });
              }}
            >
              <Select.Option value="122">行政区域</Select.Option>
              <Select.Option value="222">地理区域</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item name="type1" label="计算标准">
          <Select showSearch style={{ width: 80 }} placeholder="" />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" className={styles.btn}>
            生成报告
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BaseInfo;
