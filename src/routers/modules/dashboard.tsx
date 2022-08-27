import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';
import DataVisualize from '@/views/dashboard/dataVisualize/index';
import Embedded from '@/views/dashboard/embedded/index';

// dashboard 模块
const dashboardRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: 'Dashboard',
    },
    children: [
      {
        path: '/dashboard/dataVisualize',
        element: <DataVisualize />,
        meta: {
          requiresAuth: true,
          title: '数据可视化',
          key: 'dataVisualize',
        },
      },
      {
        path: '/dashboard/embedded',
        element: <Embedded />,
        meta: {
          requiresAuth: true,
          title: '内嵌页面',
          key: 'embedded',
        },
      },
    ],
  },
];

export default dashboardRouter;
