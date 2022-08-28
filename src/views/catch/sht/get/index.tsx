import {
  Button,
  Input,
  Form,
  DatePicker,
  InputNumber,
  Card,
  Popconfirm,
  Row,
  Col,
  message,
} from 'antd';
import config from './config';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { basename } from 'path';

type TSHTConfig = {
  base: string;
  from: number;
  to: number;
  date: number;
};

const ShtGet = () => {
  let shtConfig = window.$storage.get('sht-config');
  if (!shtConfig) {
    shtConfig = config;
    window.$storage.set('sht-config', config);
  }
  const [form] = Form.useForm();

  const [curConfig, setCurConfig] = useState<TSHTConfig>(shtConfig);

  const onValuesChange = (_changed: Partial<TSHTConfig>, values: TSHTConfig) => {
    // if (values.from <= values.to) {
    setCurConfig(values);
    // } else {
    //   message.error('开始页必须小于等于目标页！');
    // }
  };
  const handleCatchSHT = async () => {
    if (curConfig.from <= curConfig.to) {
      window.$storage.set('sht-config', curConfig);
      const res = await window.$ipcRenderer.invoke('sht-catch', curConfig);
      console.log('handleCatchSHT res', res);
    } else {
      message.error('开始页必须小于等于目标页！');
    }
    // console.log('handleCatchSHT', curConfig);
  };
  const handleFormToday = () => {
    // console.log('handleFormToday');
    // console.log(form.getFieldsValue());
    form.setFieldsValue({
      date: moment(new Date()),
    });
    setCurConfig(form.getFieldsValue());
    console.log(form.getFieldsValue());
  };

  return (
    <div>
      <Card>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          onValuesChange={onValuesChange}
          onFinish={handleCatchSHT}
          initialValues={{
            ...shtConfig,
            date: moment(shtConfig.date),
          }}
        >
          <Form.Item
            name='base'
            label='base地址'
          >
            <Input />
          </Form.Item>
          <Form.Item label='上次抓取日期'>
            <Form.Item
              name='date'
              noStyle
            >
              <DatePicker />
            </Form.Item>
            <Button
              type='ghost'
              className='ml-20px'
              onClick={handleFormToday}
            >
              设置为今天
            </Button>
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name='from'
            label='开始页'
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name='to'
            label='目标页'
          >
            <InputNumber />
          </Form.Item>
        </Form>
        <div className='flex justify-center space-x-10px'>
          <Button
            type='primary'
            onClick={() => {
              window.$storage.set('sht-config', curConfig);
            }}
          >
            保存设置
          </Button>
          <Popconfirm
            title='是否开始抓取，请确认配置！'
            onConfirm={form.submit}
            okText='开始'
            cancelText='取消'
          >
            <Button
              type='primary'
              htmlType='submit'
            >
              开始抓取
            </Button>
          </Popconfirm>
          <Button
            danger
            onClick={async () => {
              await window.$ipcRenderer.invoke('catch-sht:stop');
            }}
          >
            中断抓取
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ShtGet;
