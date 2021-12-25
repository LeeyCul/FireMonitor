import { useState } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Button,
  Select,
  TreeSelect,
  Radio,
  Checkbox,
} from 'antd';
import Page from '@/common/components/Page';
import Diagram from './diagram';
import styles from './style.less';

const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const optionsWithDisabled = [
  { label: '数据名称1', value: 'Apple12' },
  { label: '数据名称2', value: 'Apple3' },
  { label: '数据名称3', value: 'Apple1' },
  { label: '数据名称4', value: 'Pear' },
  { label: '数据名称5', value: 'Orange', disabled: false },
];

function index() {
  const [form] = Form.useForm();
  const [radioValue, setradioValue] = useState(1);
  const [graphVal, setGraph] = useState(1);

  const onChange = (e: any) => {
    setradioValue(e.target.value);
  };

  const graphChange = (e: any) => {
    console.log('e.target.value', e.target.value);
    setGraph(e.target.value);
  };

  const onValuesChange = (value: any, allValues: any) => {
    // setFormData1(allValues);
  };

  const TitleView = ({ title }: { title: string }) => (
    <div className={styles.title}>{title}</div>
  );
  return (
    <Page clsName={styles.statisticView}>
      <div className={styles.leftConainer}>
        <TitleView title="图形类型" />
        <div className={styles.adressView}>
          地 区&emsp;
          <Radio.Group onChange={onChange} value={radioValue}>
            <Radio value={1}>等级图</Radio>
            <Radio value={2}>趋势图</Radio>
          </Radio.Group>
        </div>
        <TitleView title="筛选条件" />
        <div className={styles.formView}>
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
                  style={{ width: 100, marginLeft: '10px' }}
                  placeholder="请选择"
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
            {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit" className={styles.btn}>
                生成报告
              </Button>
            </Form.Item> */}
          </Form>
        </div>
        <TitleView title="图形选择" />
        <div className={styles.selectDataView}>
          <div className={styles.typeView}>
            类 型&emsp;
            <Radio.Group onChange={graphChange} value={graphVal}>
              <Radio value="line">条形图</Radio>
              <Radio value="bar">柱状图</Radio>
            </Radio.Group>
          </div>
          <div className={styles.typeView}>
            Y &nbsp;轴&emsp;
            <Checkbox.Group options={optionsWithDisabled} onChange={onChange} />
          </div>
          <div className={styles.typeView}>X &nbsp;轴&emsp; 时间</div>
        </div>
        <div className={styles.btnView}>
          <Button type="primary" className={styles.btn}>
            生成报告
          </Button>
        </div>
      </div>
      <div className={styles.rightConainer}>
        <Diagram />
      </div>
    </Page>
  );
}

export default index;
