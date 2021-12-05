import {
  Modal,
  Steps,
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Cascader,
  Upload,
  Button,
} from 'antd';
import { useState, useMemo, useCallback } from 'react';
import Iconfont from '@/common/components/IconFont';
import styles from './style.less';

interface Props {
  visible: boolean;
}

export default function (props: Props) {
  const { visible } = props;
  const [current, setCurrent] = useState<number>(0);
  const form = Form.useForm();
  const handleReset = useCallback(() => {
    // form.;
  }, [form]);
  const handleNext = useCallback(() => {
    setCurrent(1);
  }, [form]);
  const handleBack = useCallback(() => {
    setCurrent(0);
  }, []);
  const handleSave = useCallback(() => {
    // form
  }, [form]);

  const formDom = useMemo(
    () => (
      <div className={styles.form}>
        <Form>
          <Form.Item
            label="案例名称"
            name="title"
            rules={[{ max: 50, message: '输入50字以内的名称' }]}
          >
            <Input placeholder="输入50字以内的名称" />
          </Form.Item>
          <Form.Item
            label="案例简介"
            name="description"
            rules={[{ max: 500, message: '输入500字以内的简介' }]}
          >
            <Input.TextArea placeholder="输入500字以内的简介" />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                label="时间范围"
                name="range"
                wrapperCol={{ span: 20 }}
              >
                <DatePicker.RangePicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="计算标准"
                name="standard"
                labelCol={{ span: 8 }}
              >
                <Select options={[]} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label="区域类型"
                name="areaType"
                // area
                wrapperCol={{ span: 20 }}
              >
                <Cascader options={[]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="台站" name="stationType" labelCol={{ span: 8 }}>
                <Select options={[]} />
              </Form.Item>
            </Col>
            <Form.Item label="附件上传" name="file">
              <Upload>
                <Button>上传文件</Button>
              </Upload>
            </Form.Item>
          </Row>
        </Form>
        <Row align="middle" justify="center" gutter={24}>
          <Col>
            <Button color="warn" onClick={handleReset}>
              重置
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={handleNext}>
              下一步
            </Button>
          </Col>
        </Row>
      </div>
    ),
    [form, current],
  );
  const previewDom = useMemo(
    () => (
      <Row align="middle" justify="center" gutter={24}>
        <Col>
          <Button onClick={handleBack}>上一步</Button>
        </Col>
        <Col>
          <Button type="primary" onClick={handleSave}>
            保存并关闭
          </Button>
        </Col>
      </Row>
    ),
    [current],
  );

  return (
    <Modal
      width={946}
      visible={visible}
      title={
        <Row align="middle" gutter={10}>
          <Col>
            <Iconfont type="iconimage-text" />
          </Col>
          <span>新建档案</span>
        </Row>
      }
      footer={null}
    >
      <div className={styles.stepWrapper}>
        <Steps direction="vertical" current={current} className={styles.step}>
          <Steps.Step title="步骤一" description="创建基本信息" />
          <Steps.Step title="步骤二" description="预览确认" />
        </Steps>
        {formDom}
        {previewDom}
      </div>
    </Modal>
  );
}
