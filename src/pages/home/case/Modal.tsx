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
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import cn from 'classnames';
import Iconfont from '@/common/components/IconFont';
import styles from './style.less';
import SiChuanMap from '@/common/components/SichuanMap';
import { Standard, Station } from '@/common/constant';
import AreaFormItem from '@/common/components/AreaFormItem';
import { postMultiUpload } from '@/common/api';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function (props: Props) {
  const { visible, onClose } = props;
  const [current, setCurrent] = useState<number>(0);
  const levelRef = useRef<string>();
  const [form] = Form.useForm();
  const handleReset = useCallback(() => {
    form.resetFields();
  }, [form]);
  const handleNext = useCallback(async () => {
    await form.validateFields();
    setCurrent(1);
  }, [form]);
  const handleBack = useCallback(() => {
    setCurrent(0);
  }, []);
  const handleSave = useCallback(() => {
    const { file, areaType, ...other } = form.getFieldsValue();
    postMultiUpload({ files: [levelRef.current].concat(file?.fileList || []) });
    // form
    // onClose
  }, [form, onClose]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    setCurrent(0);
    onClose();
  }, [form, onClose]);

  const formDom = useMemo(
    () => (
      <div className={cn(styles.stepBox, !current ? styles.activeStep : '')}>
        <Form form={form}>
          <Form.Item
            label="案例名称"
            name="title"
            labelCol={{ span: 4 }}
            rules={[
              { max: 50, message: '输入50字以内的名称' },
              { required: true, message: '请输入案例名称' },
            ]}
          >
            <Input placeholder="输入50字以内的名称" />
          </Form.Item>
          <Form.Item
            label="案例简介"
            name="description"
            labelCol={{ span: 4 }}
            rules={[{ max: 500, message: '输入500字以内的简介' }]}
          >
            <Input.TextArea placeholder="输入500字以内的简介" />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                label="时间范围"
                name="range"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
                rules={[{ required: true, message: '请选择时间范围' }]}
              >
                <DatePicker.RangePicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="计算标准"
                name="standard"
                labelCol={{ span: 8 }}
                rules={[{ required: true, message: '请选择计算标准' }]}
              >
                <Cascader options={Standard} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <AreaFormItem
                labelCol={{ span: 8 }}
                rules={[{ required: true, message: '请选择计算标准' }]}
              />
            </Col>
            <Col span={12}>
              <Form.Item
                label="台站"
                name="stationType"
                labelCol={{ span: 8 }}
                rules={[{ required: true, message: '请选择台站' }]}
              >
                <Select options={Station} placeholder="请选择台站" />
              </Form.Item>
            </Col>
            <Form.Item
              label="附件上传"
              name="file"
              labelCol={{ span: 4 }}
              style={{ width: '100%' }}
            >
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
      <div className={cn(styles.stepBox, current ? styles.activeStep : '')}>
        <SiChuanMap onGetImage={(level) => (levelRef.current = level)} />
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
      </div>
    ),
    [current],
  );

  useEffect(() => {}, []);

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
      onCancel={handleCancel}
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
