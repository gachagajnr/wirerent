import React from 'react';
import {
  UserOutlined,
  SortAscendingOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  TransactionOutlined,
  SmallDashOutlined,
  ProfileOutlined,
  BuildFilled,
  ReconciliationFilled,
  PropertySafetyFilled,
} from '@ant-design/icons';

const superuserMenu = {
  menus: [
    {
      key: 12,
      text: 'Quick View',
      icon: <SmallDashOutlined />,
      link: '/quickview',
    },
    {
      key: 13,
      text: 'Agents',
      icon: <DashboardOutlined />,
      link: '/agencies',
    },
    {
      key: 14,
      text: 'Buildings',
      icon: <BuildFilled />,
      link: '/buildings',
    },
    {
      key: 15,
      text: 'Units',
      icon: <PropertySafetyFilled />,
      link: '/units',
    },
    {
      key: 16,
      text: 'Tenants',
      icon: <UsergroupAddOutlined />,
      link: '/tenants',
    },
    {
      key: 17,
      text: 'Transactions',
      icon: <TransactionOutlined />,
      link: '/transactions',
    },
    {
      key: 18,
      text: 'Requests',
      icon: <SortAscendingOutlined />,
      link: '/requests',
    },
    {
      key: 19,
      text: 'Inventory',
      icon: <ReconciliationFilled />,
      link: '/inventory',
    },
  ],
};

export default superuserMenu;
