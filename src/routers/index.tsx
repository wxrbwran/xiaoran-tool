import { Navigate, useRoutes } from 'react-router-dom';
import { RouteObject } from '@/routers/interface';
import Login from '@/views/login/index';

// @ts-nocheck
// * 导入所有router
const metaRouters: any = import.meta.globEager('./modules/*.tsx');

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach((item) => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key]);
  });
});

console.log('routerArray', routerArray);
export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/catch/sht/rename' />,
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: '登录页',
      key: 'login',
    },
  },
  ...routerArray,
  {
    path: '*',
    element: <Navigate to='/404' />,
  },
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
