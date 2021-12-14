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
import moment from 'moment';
import Iconfont from '@/common/components/IconFont';
import styles from './style.less';
import SiChuanMap from '@/common/components/SichuanMap';
import { Standard, Station } from '@/common/constant';
import AreaFormItem from '@/common/components/AreaFormItem';
import { postCreateCase, getCaseDetail, putUpdateCase } from '@/common/api';

interface Props {
  id: number | null;
  visible: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export default function (props: Props) {
  const { id, visible, onClose, onRefresh } = props;
  const [current, setCurrent] = useState<number>(0);
  const [oldFile, setOldFile] = useState<any[]>([]);
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
    const { file, areaList, range, standard, ...other } = form.getFieldsValue();
    const [areaType, area] = areaList;
    const request = id ? putUpdateCase : postCreateCase;
    const data = {
      areaType,
      area: `${area}`,
      startTime: range[0],
      endTime: range[1],
      standard: standard.join(','),
      ...other,
    };
    if (file) {
      data.file = JSON.stringify(file.fileList);
    }
    if (id) {
      data.id = id;
    }
    request(data).then(() => {
      onClose();
      onRefresh();
      setCurrent(0);
      form.resetFields();
    });
  }, [id, form, onClose]);

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
              <Upload
                action="/api/file/upload"
                fileList={oldFile}
                onChange={({ fileList }) => setOldFile(fileList)}
              >
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
    [form, current, oldFile],
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

  useEffect(() => {
    if (id && visible) {
      getCaseDetail(id).then(({ data }) => {
        const { area, areaType, startTime, endTime, standard, file, ...other } =
          data;
        form.setFieldsValue({
          range: [moment(startTime), moment(endTime)],
          areaList: [areaType, Number(area)],
          standard: standard.split(',').map((value) => Number(value)),
          file: { fileList: JSON.parse(file) },
          ...other,
        });
        setOldFile(JSON.parse(file));
      });
    } else {
      setOldFile([]);
    }
  }, [id, visible]);

  return (
    <Modal
      width={946}
      visible={visible}
      destroyOnClose
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
