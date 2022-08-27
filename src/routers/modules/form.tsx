import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';
import BasicForm from '@/views/form/basicForm/index';
import ValidateForm from '@/views/form/validateForm/index';
import DynamicForm from '@/views/form/dynamicForm/index';

// 表单 Form 模块
const formRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: '表单 Form',
    },
    children: [
      {
        path: '/form/basicForm',
        element: <BasicForm />,
        meta: {
          requiresAuth: true,
          title: '基础 Form',
          key: 'basicForm',
        },
      },
      {
        path: '/form/validateForm',
        element: <ValidateForm />,
        meta: {
          requiresAuth: true,
          title: '校验 Form',
          key: 'validateForm',
        },
      },
      {
        path: '/form/dynamicForm',
        element: <DynamicForm />,
        meta: {
          requiresAuth: true,
          title: '动态 Form',
          key: 'dynamicForm',
        },
      },
    ],
  },
];

export default formRouter;
