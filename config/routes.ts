﻿export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/poolManage',
    icon: 'AlignRightOutlined',
    name: 'pool manage',
    component: './PoolManage',
  },
  {
    path: '/',
    redirect: '/poolManage',
  },
  {
    component: './404',
  },
];
