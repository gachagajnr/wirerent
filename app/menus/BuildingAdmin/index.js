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

const buildingAdminMenu = {
  menus: [
    {
      key: '212',
      text: 'Dashboard',
      icon: <DashboardOutlined />,
      link: '/x',
    },
    {
      key: '222',
      text: 'Units',
      icon: <PropertySafetyFilled />,
      link: '/xun',
    },
    {
      key: '232',
      text: 'Tenants',
      icon: <UserOutlined />,
      link: '/xte',
    },
    {
      key: '242',
      text: 'Transactions',
      icon: <TransactionOutlined />,
      link: '/xtra',
    },
    {
      key: '252',
      text: 'Requests',
      icon: <SortAscendingOutlined />,
      link: '/xreq',
    },
    {
      key: '262',
      text: 'Inventory',
      icon: <ReconciliationFilled />,
      link: '/inventory',
    },
  ],
};

export default buildingAdminMenu;
