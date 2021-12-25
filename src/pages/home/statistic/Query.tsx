import React, { useEffect, useState } from 'react';
import { Form, Select, Button, DatePicker, message, TreeSelect } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { useDispatch } from 'umi';
import dayjs from 'dayjs';
import _ from 'lodash';
import * as apis from '@/common/api';
import Iconfont from '@/common/components/IconFont';
import styles from './style.less';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface Props {
  onChange?: (value: any) => void;
}

function Query({ onChange }: Props) {
  const [form] = Form.useForm();
  const [list, setList] = useState<any[]>([]);
  const dispatch = useDispatch();
  const { run } = useRequest<any>(apis.getAreaList, {
    formatResult: (res) => res?.data,
    onError: (e) => message.error(e),
    manual: true,
  });
  useEffect(() => {
    run({ pid: '510000' }).then((res) => {
      const result = genTreeNode(res);
      setList(result);
    });
  }, []);

  const onFinish = (values: any) => {
    const { time, code } = values || {};
    const start = time?.[0] ? dayjs(time?.[0])?.format('YYYY-MM-DD') : null;
    const end = time?.[0] ? dayjs(time?.[1])?.format('YYYY-MM-DD') : null;
    values.code = code?.join(',');
    delete values.time;
    const query = _.pickBy({ ...values, start, end });
    onChange?.(query);
  };
  const genTreeNode = (data: any[], parentId?: any) =>
    data?.map((item: any, index: number) => ({
      value: `${item?.code}`,
      pId: parentId || item?.level,
      title: item?.name,
      id: item?.code,
      isLeaf: item?.level > 2,
    }));

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

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
    >
      <div className={styles.formView}>
        <Form.Item name="time" label="时间范围">
          <RangePicker style={{ width: 160 }} />
        </Form.Item>
        <Form.Item name="type" label="台站">
          <Select showSearch style={{ width: 120 }} placeholder="请选择">
            <Option value="0">国标</Option>
            <Option value="1">区域站</Option>
          </Select>
        </Form.Item>
        <Form.Item name="level" label="区域类型">
          <Select
            defaultValue="1"
            style={{ width: 120 }}
            placeholder="请选择"
            onChange={(value) => {
              dispatch({ type: 'detection/getCityData', payload: 0 });
            }}
          >
            <Option value="1">行政区域</Option>
            <Option value="2">地理区域</Option>
          </Select>
        </Form.Item>
        <Form.Item name="code">
          <TreeSelect
            multiple
            treeDataSimpleMode
            style={{ width: 140 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="请选择"
            loadData={onLoadData}
            treeData={list}
          />
        </Form.Item>
        <div className={styles.lastTwo}>
          <Form.Item name="type" label="计算标准">
            <Select showSearch style={{ width: 100 }} placeholder="请选择" />
          </Form.Item>
          <Form.Item name="password3" label="数据段">
            <Select showSearch style={{ width: 200 }} placeholder="请选择">
              <Option value="jack">逐日</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>
        </div>
      </div>
      <div>
        <Form.Item shouldUpdate>
          {() => (
            <>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                查询
              </Button>
              &emsp;
              <Button
                onClick={() => {
                  onChange?.({});
                  form.resetFields();
                }}
                icon={<Iconfont type="iconrefresh" size={12} />}
              >
                重置
              </Button>
            </>
          )}
        </Form.Item>
      </div>
    </Form>
  );
}

export default Query;
