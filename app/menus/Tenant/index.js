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

const tenantMenu = {
  menus: [
    {
      key: 'uni',
      text: 'Home',
      icon: <SmallDashOutlined />,
      link: '/udas',
    },
    {
      key: 'uno',
      text: 'My Transactions',
      icon: <TransactionOutlined />,
      link: '/utra',
    },

    {
      key: 'una',
      text: 'My Requests',
      icon: <PropertySafetyFilled />,
      link: '/ureq',
    },
  ],
};

export default tenantMenu;
