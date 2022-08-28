import { Button, Input, Card, Popconfirm, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';

type TSHTConfig = {
  base: string;
  total: number;
  date: number;
};

const ShtRename = () => {
  const [dir, setDir] = useState('');

  const handleChangeDir = (e: any) => {
    if (e.target.files[0]) {
      const path = e.target.files[0].path;
      console.log('path', path);

      const filename = e.target.files[0].name;
      console.log('filename', filename);

      const baseDir = path.split(filename)[0];
      console.log('baseDir', baseDir);
      setDir(baseDir);
    }
  };

  const handleBtnClick = async () => {
    const res = await window.$ipcRenderer.invoke('sht-rename', { baseDir: dir });
    console.log(res);
  };
  const handleBtnClickMove = async () => {
    const res = await window.$ipcRenderer.invoke('sht-move', { baseDir: dir });
    console.log(res);
  };
  return (
    <Card>
      <div
        className='inline h-32px leading-loose line-clamp-1 text-ellipsis'
        title={`${dir}`}
      >
        {`选择的文件夹：${dir}`}
      </div>
      <div className='flex space-x-10px justify-center '>
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

        <Popconfirm
          disabled={!dir}
          title='请确认文件夹及JSON文件已就位！'
          onConfirm={handleBtnClick}
          okText='开始重命名'
          cancelText='取消'
        >
          <Button
            type='primary'
            disabled={!dir}
          >
            开始重命名
          </Button>
        </Popconfirm>
        <Popconfirm
          disabled={!dir}
          title='开始移动单文件文件夹'
          onConfirm={handleBtnClickMove}
          okText='开始移动'
          cancelText='取消'
        >
          <Button
            type='primary'
            disabled={!dir}
          >
            开始移动
          </Button>
        </Popconfirm>
      </div>
    </Card>
  );
};

export default ShtRename;
