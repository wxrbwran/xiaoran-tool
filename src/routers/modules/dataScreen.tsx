import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';
import DataScreen from '@/views/dataScreen/index';

// 数据大屏模块
const dataScreenRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: '/dataScreen/index',
        element: <DataScreen />,
        meta: {
          requiresAuth: true,
          title: '数据大屏',
          key: 'dataScreen',
        },
      },
    ],
  },
];

export default dataScreenRouter;
