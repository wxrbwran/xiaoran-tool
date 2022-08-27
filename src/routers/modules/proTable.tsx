import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';
import ProTableHooks from '@/views/proTable/useHooks/index';
import ProTableComponents from '@/views/proTable/useComponent/index';

// 超级表格模块
const proTableRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: '超级表格',
    },
    children: [
      {
        path: '/proTable/useHooks',
        element: <ProTableHooks />,
        meta: {
          requiresAuth: true,
          title: '使用 Hooks',
          key: 'useHooks',
        },
      },
      {
        path: '/proTable/useComponent',
        element: <ProTableComponents />,
        meta: {
          requiresAuth: true,
          title: '使用 Component',
          key: 'useComponent',
        },
      },
    ],
  },
];

export default proTableRouter;
