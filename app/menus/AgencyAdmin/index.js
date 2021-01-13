import {
  BuildFilled,
  DashboardOutlined,
  MailOutlined,
  PlusOutlined,
  ProfileOutlined,
  PropertySafetyFilled,
  ReconciliationFilled,
  SmallDashOutlined,
  SortAscendingOutlined,
  TransactionOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

import React from 'react';

const adminMenu = {
  menus: [
    {
      key: '1',
      text: 'DashBoard',
      icon: <SmallDashOutlined />,
      link: '/dashboard',
    },
    {
      key: '2',
      text: 'Home',
      icon: <DashboardOutlined />,
      link: '/agent',
    },
    {
      key: '6',
      text: 'Transactions',
      icon: <TransactionOutlined />,
      link: '/transactions',
    },
    {
      key: '3',
      text: 'Buildings',
      icon: <BuildFilled />,
      link: '/buildings',
    },
    {
      key: '4',
      text: 'Units',
      icon: <PropertySafetyFilled />,
      link: '/units',
    },
    {
      key: '5',
      text: 'Moving Tenants',
      icon: <UsergroupAddOutlined />,
      link: '/moving',
    },

    {
      key: '8',
      text: 'Add Requests',
      icon: <ReconciliationFilled />,
      link: '/add_reqs',
    },
    {
      key: '433',
      text: 'Teams',
      icon: <UsergroupAddOutlined />,
      link: '/ate',
    },
    {
      key: 'rt',
      text: 'Services',
      icon: <SortAscendingOutlined />,
      link: '/requests',
    },
  ],
};

export default adminMenu;
