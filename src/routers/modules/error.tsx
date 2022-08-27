import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { RouteObject } from '@/routers/interface';
import Error403 from '@/components/ErrorMessage/403';
import Error404 from '@/components/ErrorMessage/404';
import Error500 from '@/components/ErrorMessage/500';

// 错误页面模块
const errorRouter: Array<RouteObject> = [
  {
    path: '/403',
    element: <Error403 />,
    meta: {
      requiresAuth: true,
      title: '403页面',
      key: '403',
    },
  },
  {
    path: '/404',
    element: <Error404 />,
    meta: {
      requiresAuth: false,
      title: '404页面',
      key: '404',
    },
  },
  {
    path: '/500',
    element: <Error500 />,
    meta: {
      requiresAuth: false,
      title: '500页面',
      key: '500',
    },
  },
];

export default errorRouter;
