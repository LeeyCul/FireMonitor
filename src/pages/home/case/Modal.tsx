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
            label="????????????"
            name="title"
            labelCol={{ span: 4 }}
            rules={[
              { max: 50, message: '??????50??????????????????' },
              { required: true, message: '?????????????????????' },
            ]}
          >
            <Input placeholder="??????50??????????????????" />
          </Form.Item>
          <Form.Item
            label="????????????"
            name="description"
            labelCol={{ span: 4 }}
            rules={[{ max: 500, message: '??????500??????????????????' }]}
          >
            <Input.TextArea placeholder="??????500??????????????????" />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                label="????????????"
                name="range"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
                rules={[{ required: true, message: '?????????????????????' }]}
              >
                <DatePicker.RangePicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="????????????"
                name="standard"
                labelCol={{ span: 8 }}
                rules={[{ required: true, message: '?????????????????????' }]}
              >
                <Cascader options={Standard} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <AreaFormItem
                labelCol={{ span: 8 }}
                rules={[{ required: true, message: '?????????????????????' }]}
              />
            </Col>
            <Col span={12}>
              <Form.Item
                label="??????"
                name="stationType"
                labelCol={{ span: 8 }}
                rules={[{ required: true, message: '???????????????' }]}
              >
                <Select options={Station} placeholder="???????????????" />
              </Form.Item>
            </Col>
            <Form.Item
              label="????????????"
              name="file"
              labelCol={{ span: 4 }}
              style={{ width: '100%' }}
            >
              <Upload
                action="/api/file/upload"
                fileList={oldFile}
                onChange={({ fileList }) => setOldFile(fileList)}
              >
                <Button>????????????</Button>
              </Upload>
            </Form.Item>
          </Row>
        </Form>
        <Row align="middle" justify="center" gutter={24}>
          <Col>
            <Button color="warn" onClick={handleReset}>
              ??????
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={handleNext}>
              ?????????
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
            <Button onClick={handleBack}>?????????</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={handleSave}>
              ???????????????
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
          <span>????????????</span>
        </Row>
      }
      onCancel={handleCancel}
      footer={null}
    >
      <div className={styles.stepWrapper}>
        <Steps direction="vertical" current={current} className={styles.step}>
          <Steps.Step title="?????????" description="??????????????????" />
          <Steps.Step title="?????????" description="????????????" />
        </Steps>
        {formDom}
        {previewDom}
      </div>
    </Modal>
  );
}
