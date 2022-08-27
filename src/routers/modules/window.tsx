import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';
import WindowVideo from '@/views/window/video/index';
// 弹出窗口 模块
const formRouter: Array<RouteObject> = [
  {
    // element: <LayoutIndex />,
    meta: {
      title: '新窗口',
    },
    children: [
      {
        path: '/window/video',
        element: <WindowVideo />,
        meta: {
          title: '播放视频',
          key: 'window-play-video',
        },
      },
    ],
  },
];

export default formRouter;
