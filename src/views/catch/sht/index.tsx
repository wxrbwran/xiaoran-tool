import { Button, Input, Form, DatePicker, InputNumber, Card, Popconfirm } from 'antd';
import config from './config';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

type TSHTConfig = {
  base: string;
  total: number;
  date: number;
};

const SHT = () => {
  let shtConfig = window.$storage.get('sht-config');
  if (!shtConfig) {
    shtConfig = config;
    window.$storage.set('sht-config', config);
  }
  const [form] = Form.useForm();
  const [dir, setDir] = useState('');

  const [curConfig, setCurConfig] = useState<TSHTConfig>(shtConfig);
  const handleChangeDir = (e: any) => {
    if (e.target.files[0]) {
      const path = e.target.files[0].path;
      const filename = e.target.files[0].name;
      setDir(path.split(filename)[0]);
    }
  };

  const onValuesChange = (_changed: Partial<TSHTConfig>, values: TSHTConfig) => {
    setCurConfig(values);
  };
  const handleCatchSHT = async () => {
    // console.log('handleCatchSHT', curConfig);
    window.$storage.set('sht-config', curConfig);
    const res = await window.$ipcRenderer.invoke('catch-sht', curConfig);
    console.log('handleCatchSHT res', res);
  };

  const handleBtnClick = async () => {};

  return (
    <div>
      <Card title='抓取sht'>
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
          <Form.Item
            name='date'
            label='上次抓取日期'
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name='from'
            label='从第几页开始'
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
            label='到第几页'
          >
            <InputNumber />
          </Form.Item>
        </Form>
        <div className='flex justify-center'>
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
        </div>
      </Card>
      <Card className='my-20px'>
        <div className='flex space-x-10px justify-center '>
          <Button></Button>
          <div className='relative'>
            <Button className='cursor-pointer'>选择</Button>
            <Input
              onChange={handleChangeDir}
              className='input-file'
              type='file'
              multiple
              // @ts-ignore
              directory=''
              webkitdirectory=''
            />
          </div>
          <Button
            type='primary'
            onClick={handleBtnClick}
          >
            确认
          </Button>
        </div>
        <div
          className='inline h-32px leading-loose line-clamp-1 text-ellipsis'
          title={`${dir}`}
        >
          {`选择的文件夹：${dir}`}
        </div>
      </Card>
    </div>
  );
};

export default SHT;
