import { Input, Button } from 'antd';
import { useState, useRef } from 'react';

const VideoInfo = () => {
  const [dir, setDir] = useState();

  const handleChangeDir = (e) => {
    console.log('value', e.target.value);
    console.log('files', e.target.files);
  };
  return (
    <div>
      <div className='flex space-x-10px justify-end'>
        <div className='relative'>
          <Button className='cursor-pointer'>选择文件夹</Button>
          <Input
            onChange={handleChangeDir}
            className='input-file'
            type='file'
            multiple
            directory=''
            webkitdirectory=''
          />
        </div>
        <div className='relative'>
          <Button> 选择文件</Button>
          <Input
            onChange={handleChangeDir}
            className='input-file'
            type='file'
          />
        </div>
        <Button
          type='primary'
          className=''
        >
          确认
        </Button>
      </div>
    </div>
  );
};

export default VideoInfo;
