import { useState, useEffect } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Button,
  Select,
  TreeSelect,
  message,
} from 'antd';
import { useRequest } from 'ahooks';
import _ from 'lodash';
import { history } from 'umi';
import { Links } from '@/common/constant';
import * as apis from '@/common/api';
import styles from './style.less';

const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const BaseInfo = () => {
  const [formData1, setFormData1] = useState<object>({});
  const [list, setList] = useState<any[]>([]);
  const [form] = Form.useForm();

  const { run } = useRequest<any>(apis.getAreaList, {
    onError: (e) => message.error(e),
    manual: true,
  });
  const { run: addRun } = useRequest(apis.getAdd, { manual: true });
  useEffect(() => {
    run({ pid: '510000' }).then((res) => {
      const result = genTreeNode(res);
      setList(result);
    });
  }, []);

  const onFinish = (values: any) => {
    const { time, area, predTime } = values;
    const value = {
      ...values,
      startTime: time ? time[0].format('YYYY-MM-DD') : undefined,
      endTime: time ? time[1].format('YYYY-MM-DD') : undefined,
      predStartTime: predTime ? predTime[0].format('YYYY-MM-DD') : undefined,
      predEndTime: predTime ? predTime[1].format('YYYY-MM-DD') : undefined,
      area: area ? area?.toString() : undefined,
    };
    delete value?.time;
    delete value?.predTime;
    addRun(_.pickBy(value));
    history.push(Links.ServeReportList);
  };
  const onValuesChange = (value: any, allValues: any) => {
    setFormData1(allValues);
  };

  const genTreeNode = (data: any[] = [], parentId?: any) =>
    data?.length
      ? data?.map((item: any, index: number) => ({
          value: `${item?.code}`,
          pId: parentId || item?.level,
          title: item?.name,
          id: item?.code,
          isLeaf: item?.level > 2,
        }))
      : [];

  const onLoadData = ({ id }: any) =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        run({ pid: id }).then((res) => {
          const result = genTreeNode(res, id);
          setList(list.concat(result));
        });
        resolve();
      }, 300);
    });

  console.log('formData1', formData1);
  return (
    <div className={styles.leftView}>
      <Form
        form={form}
        colon={false}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item name="title" label="????????????">
          <Input />
        </Form.Item>
        <Form.Item name="number" label="??? ???">
          <Input />
        </Form.Item>
        <Form.Item name="creator" label="?????????">
          <Input />
        </Form.Item>
        <Form.Item name="dataSource" label="??? ???">
          <Input />
        </Form.Item>
        <Form.Item name="time" label="????????????">
          <RangePicker />
        </Form.Item>
        <Form.Item name="predTime" label="????????????">
          <RangePicker />
        </Form.Item>
        <div className={styles.formsty}>
          <Form.Item name="level1" label="????????????" labelCol={{ span: 7 }}>
            <Select
              defaultValue="1"
              style={{ width: 100, marginLeft: '6px' }}
              placeholder="?????????"
            >
              <Select.Option value="0">????????????</Select.Option>
              <Select.Option value="1">????????????</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="area" labelCol={{ span: 2 }}>
            <TreeSelect
              multiple
              treeDataSimpleMode
              style={{ width: 120 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="?????????"
              loadData={onLoadData}
              treeData={list}
            />
          </Form.Item>
        </div>

        <Form.Item name="type1" label="????????????">
          <Select showSearch style={{ width: 80 }} placeholder="" />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" className={styles.btn}>
            ????????????
          </Button>
          &emsp;
          <Button
            type="primary"
            className={styles.btn}
            onClick={() => history.push(Links.ServeReportList)}
          >
            ???&emsp;???
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BaseInfo;
