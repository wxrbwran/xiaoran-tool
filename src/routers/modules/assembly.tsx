import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';
import SelectIcon from '@/views/assembly/selectIcon/index';
import BatchImport from '@/views/assembly/batchImport/index';

// 常用组件模块
const assemblyRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: '常用组件',
    },
    children: [
      {
        path: '/assembly/selectIcon',
        element: <SelectIcon />,
        meta: {
          requiresAuth: true,
          title: 'Icon 选择',
          key: 'selectIcon',
        },
      },
      {
        path: '/assembly/batchImport',
        element: <BatchImport />,
        meta: {
          requiresAuth: true,
          title: '批量导入数据',
          key: 'selectIcon',
        },
      },
    ],
  },
];

export default assemblyRouter;
