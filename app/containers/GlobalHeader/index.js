/**
 *
 * GlobalHeader
 *
 */

import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, useHistory } from 'react-router-dom';
import { Layout, Space, Avatar, Tag, Tooltip, Row, Col } from 'antd';
import { AuthContext } from 'utils/AuthContext';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  ArrowLeftOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { Header } = Layout;

export function GlobalHeader(props) {
  let history = useHistory();
  const { user, logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  function toggle() {
    console.log('edrsffsf', collapsed);
    setCollapsed(!collapsed);
  }
  return (
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        backgroundColor: '#eee',
      }}
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          <Space>
            <ArrowLeftOutlined
              style={{ color: '#dc143c' }}
              onClick={() => history.goBack()}
            />
            <Tag>{user.user.role}</Tag>
            <Tag color={props.color ? props.color : 'crimson'}>
              {props.title}
            </Tag>
          </Space>
        </Col>
        <Col className="gutter-row" span={6}>
          {props.other}
        </Col>
        <Col className="gutter-row" span={6}>
          {props.extra}
        </Col>
        <Col className="gutter-row" span={6}>
          <Space>
            <Tooltip title="My Account">
              <Avatar
                icon={
                  <Link to={`/profile/${user.user._id}`}>
                    <UserOutlined />
                  </Link>
                }
              />
            </Tooltip>

            <Avatar
              style={{
                color: 'red',
                backgroundColor: '#fde3cf',
              }}
              icon={
                <Tooltip title="Logout">
                  <LogoutOutlined onClick={logout} />
                </Tooltip>
              }
            />
          </Space>
        </Col>
      </Row>
    </Header>
  );
}

GlobalHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(GlobalHeader);
