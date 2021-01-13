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

const tenantNoRoom = {
  menus: [
    {
      key: 'req',
      text: 'Request Room',
      icon: <SmallDashOutlined />,
      link: '/reqroom',
    },
    {
      key: 'una',
      text: 'Profile',
      icon: <PropertySafetyFilled />,
      link: '/profile',
    },
  ],
};

export default tenantNoRoom;
