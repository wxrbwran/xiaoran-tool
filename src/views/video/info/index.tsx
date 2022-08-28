import { Input, Button, Table, message, Popconfirm } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { videoColumns } from './columns';

type TParams = {
  type: string;
  path: string;
};

const VideoInfo = () => {
  const [dir, setDir] = useState('');
  const [file, setFile] = useState('');
  const [type, setType] = useState<string>('');
  const [dataSource, setDataSource] = useState();
  const handleChangeDir = (e: any) => {
    if (e.target.files[0]) {
      const path = e.target.files[0].path;
      const filename = e.target.files[0].name;
      setDir(path.split(filename)[0]);
      setType('dir');
    }
  };
  const handleChangeFile = (e: any) => {
    if (e.target.files[0]) {
      const path = e.target.files[0].path;
      console.log('path', path);
      setFile(path);
      setType('file');
    }
  };
  const handleBtnClick = async () => {
    const params: TParams = {
      type,
      path: type === 'file' ? file : dir,
    };
    await checkVideos(params);
  };

  const checkVideos = async (params: TParams) => {
    try {
      const response = await window.$ipcRenderer.invoke('video-check', params);
      setDataSource(response.list);
      window.$storage.set('video-check', params);
    } catch (e: any) {
      message.error(e);
    }
  };

  useEffect(() => {
    // const params = window.$storage.get('video-check');
    // if (params) {
    //   checkVideos(params);
    // }
  }, []);

  const actions = {
    title: '处理',
    dataIndex: 'operation',
    render: (text: string, record: Record<string, any>) => (
      <Popconfirm
        title='是否删除？'
        onConfirm={() => {}}
      >
        <Button
          type='primary'
          danger
        >
          删除
        </Button>
      </Popconfirm>
    ),
  };
  return (
    <div>
      <div className='flex space-x-10px justify-end mb-20px'>
        <div className='relative'>
          <Button className='cursor-pointer'>选择文件夹</Button>
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
        <div className='relative'>
          <Button> 选择文件</Button>
          <Input
            onChange={handleChangeFile}
            className='input-file'
            type='file'
          />
        </div>
        <Button
          type='primary'
          onClick={handleBtnClick}
        >
          确认
        </Button>
      </div>
      <Table
        rowKey='filedir'
        columns={[...videoColumns, actions]}
        dataSource={dataSource}
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              let data = {
                url: `/window/video?path=${record.filedir}`,
              };
              window.$ipcRenderer.invoke('window-open', data);
            },
          };
        }}
      />
    </div>
  );
};

export default VideoInfo;
