import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';
import VideoInfo from '@/views/video/info/index';

// 视频 video 模块
const videoRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: '视频处理',
    },
    children: [
      {
        path: '/video/info',
        element: <VideoInfo />,
        meta: {
          requiresAuth: true,
          title: '视频信息',
          key: 'basicVideoForm',
        },
      },
    ],
  },
];

export default videoRouter;
