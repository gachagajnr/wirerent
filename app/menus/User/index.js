import React from 'react';
import { UserOutlined } from '@ant-design/icons';

const userMenu = {
  menus: [
    {
      key: 35,
      text: 'My Profile',
      icon: <UserOutlined />,
      link: '/profile',
    },
  ],
};

export default userMenu;
