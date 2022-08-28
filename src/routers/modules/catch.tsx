import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';
import SHT from '@/views/catch/sht/index';

// 抓取 catch 模块
const catchRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: '抓取资源',
    },
    children: [
      {
        path: '/catch/sht',
        element: <SHT />,
        meta: {
          requiresAuth: true,
          title: 'sht',
          key: 'catchSHT',
        },
      },
    ],
  },
];

export default catchRouter;
