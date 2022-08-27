import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';
import Gitee from '@/views/link/gitee/index';
import GitHub from '@/views/link/github/index';
import JueJin from '@/views/link/juejin/index';

// 外部链接模块
const linkRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: '外部链接',
    },
    children: [
      {
        path: '/link/gitee',
        element: <Gitee />,
        meta: {
          requiresAuth: true,
          title: 'Gitee 仓库',
          key: 'gitee',
        },
      },
      {
        path: '/link/github',
        element: <GitHub />,
        meta: {
          requiresAuth: true,
          title: 'GitHub 仓库',
          key: 'github',
        },
      },
      {
        path: '/link/juejin',
        element: <JueJin />,
        meta: {
          requiresAuth: true,
          title: '掘金文档',
          key: 'juejin',
        },
      },
      // {
      //   path: '/link/myBlog',
      //   element: lazyLoad(React.lazy(() => import('@/views/link/myBlog/index'))),
      //   meta: {
      //     requiresAuth: true,
      //     title: '个人博客',
      //     key: 'myBlog',
      //   },
      // },
    ],
  },
];

export default linkRouter;
