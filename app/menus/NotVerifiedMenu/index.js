import React from 'react';
import { UserOutlined } from '@ant-design/icons';

const notVerified = {
  menus: [
    {
      key: 1988,
      text: 'Verify Account',
      icon: <UserOutlined />,
      link: '/verifyaccount',
    },
    {
      key: 1948,
      text: 'My Account',
      icon: <UserOutlined />,
      link: '/profile',
    },
  ],
};

export default notVerified;
