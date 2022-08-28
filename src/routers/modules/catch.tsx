import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';
import ShtGet from '@/views/catch/sht/get/index';
import ShtRename from '@/views/catch/sht/rename/index';

// 抓取 catch 模块
const catchRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: '抓取资源',
    },
    children: [
      {
        path: '/catch/sht/get',
        element: <ShtGet />,
        meta: {
          requiresAuth: true,
          title: '获取信息',
          key: 'sht-get',
        },
      },
      {
        path: '/catch/sht/rename',
        element: <ShtRename />,
        meta: {
          requiresAuth: true,
          title: '重命名',
          key: 'sht-rename',
        },
      },
      // {
      //   path: '/menu/menu2/menu22/menu221',
      //   element: <Menu221 />,
      //   meta: {
      //     requiresAuth: true,
      //     title: '菜单2-2-1',
      //     key: 'menu221',
      //   },
      // },
      // {
      //   path: '/menu/menu2/menu23',
      //   element: <Menu23 />,
      //   meta: {
      //     requiresAuth: true,
      //     title: '菜单2-3',
      //     key: 'menu23',
      //   },
      // },
      // {
      //   path: '/menu/menu3',
      //   element: <Menu3 />,
      //   meta: {
      //     requiresAuth: true,
      //     title: '菜单3',
      //     key: 'menu3',
      //   },
      // },
    ],
  },
];

export default catchRouter;
/**
 *
 * element: <LayoutIndex />,
    meta: {
      title: '嵌套菜单',
    },
    children: [
      {
        path: '/menu/menu1',
        element: <Menu1 />,
        meta: {
          requiresAuth: true,
          title: '菜单1',
          key: 'menu1',
        },
      },
      {
        path: '/menu/menu2/menu21',
        element: <Menu21 />,
        meta: {
          requiresAuth: true,
          title: '菜单2-1',
          key: 'menu21',
        },
      },
      {
        path: '/menu/menu2/menu22/menu221',
        element: <Menu221 />,
        meta: {
          requiresAuth: true,
          title: '菜单2-2-1',
          key: 'menu221',
        },
      },
      {
        path: '/menu/menu2/menu22/menu222',
        element: <Menu222 />,
        meta: {
          requiresAuth: true,
          title: '菜单2-2-2',
          key: 'menu222',
        },
      },
      {
        path: '/menu/menu2/menu23',
        element: <Menu23 />,
        meta: {
          requiresAuth: true,
          title: '菜单2-3',
          key: 'menu23',
        },
      },
      {
        path: '/menu/menu3',
        element: <Menu3 />,
        meta: {
          requiresAuth: true,
          title: '菜单3',
          key: 'menu3',
        },
      },
    ],
 */
