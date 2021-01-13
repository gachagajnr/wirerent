import {
  Avatar,
  Button,
  Col,
  Divider,
  Layout,
  Popconfirm,
  Row,
  Tag,
  Tooltip,
  Typography,
  message,
} from 'antd';
import { Descriptions, PageHeader } from 'antd';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';
import React from 'react';

const { Text } = Typography;
const { Header } = Layout;

function GlobalHeader(props) {
  return (
    <Header
      ghost={false}
      onBack={() => window.history.back()}
      title={props.title}
      subTitle={<Tag>{props.role}</Tag>}
      avatar={{
        src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
      }}
      style={{
        // height: '55px',
        // backgroundColor: '#f1eac0',
        // borderRadius: '1px 20px 1px 20px',
      }}
      extra={props.extra}
    />
  );
}

export default GlobalHeader;

//  <Button key="3">Operation</Button>,
//    <Button key="2">Operation</Button>,
//    (
//      <Popconfirm
//        placement="top"
//        title="Are you sure to Log Out?"
//        onConfirm={props.action}
//        onCancel={() => message.error('Click on No')}
//        okText="Yes"
//        cancelText="No"
//      >
//        <Avatar
//          style={{
//            color: 'red',
//            backgroundColor: '#fde3cf',
//          }}
//          icon={
//            <Tooltip title="Logout">
//              <LogoutOutlined />
//            </Tooltip>
//          }
//        />
//      </Popconfirm>
//    );
