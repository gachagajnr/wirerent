/**
 *
 * Dashboard
 *
 */

import {
  AppstoreOutlined,
  BuildFilled,
  DashboardOutlined,
  EllipsisOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  PropertySafetyFilled,
  ReconciliationFilled,
  SettingOutlined,
  SmallDashOutlined,
  SortAscendingOutlined,
  TransactionOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  WechatOutlined,
  Icon
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Layout,
  Menu,
  Popconfirm,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
  message,
} from 'antd';
import React, { memo, useContext, useState } from 'react';

import { AuthContext } from 'utils/AuthContext';
import Can from 'utils/Can';
import { FormattedMessage } from 'react-intl';
import GlobalHeader from 'components/Header/index';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import adminMenu from 'menus/AgencyAdmin/index';
import buildingAdminMenu from 'menus/BuildingAdmin/index';
import { compose } from 'redux';
import { connect } from 'react-redux';
import messages from './messages';
import notVerified from 'menus/NotVerifiedMenu/index';
import resetPasswordMenu from 'menus/ResetPassword/index';
import superUserMenu from 'menus/SuperUser/index';
import tenantMenu from 'menus/Tenant/index';
import tenantNoRoom from 'menus/TenantNoRoom/index';
import userMenu from 'menus/User/index';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

function Dashboard(props) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { role } = user.user;
  const { id } = user.user;
  const { organization } = user.user;

  function onCollapse() {
    setCollapsed(!collapsed);
  }

  return (
    <div>
      <Helmet>
        <title>WireRent</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          theme="light"
          style={{
            height: '100vh',
          }}
        >
          <div>
            {collapsed ? (
              <Avatar
                size={64}
                style={{
                  textAlign: 'center',
                  height: 32,
                  // background: '#e00b58',
                  margin: 16,
                }}
                src={require('../../images/wireren.png')}
              />
            ) : (
              <Title
                level={4}
                style={{
                  textAlign: 'center',
                  height: 32,
                  background: '#e00b58',
                  borderRadius:20,
                  margin: 16,
                }}
              >
                WireRen
              </Title>
            )}
          </div>
          <Can do="read" on="NotVerifiedMenu" field="notVerified">
            <Menu theme="dark" mode="inline">
              {notVerified.menus.map(menu => (
                <Menu.Item key={menu.key} icon={menu.icon}>
                  <Link
                    to={`${menu.link}`}
                    style={{ textDecoration: 'none' }}
                  />
                  {menu.text}
                </Menu.Item>
              ))}
            </Menu>
          </Can>
          <Can do="read" on="createMenu" field="newAdmin">
            <Menu theme="light" mode="inline">
              <Menu.Item key="dj" icon={<PropertySafetyFilled />}>
                <Link to="/new_age" style={{ textDecoration: 'none' }} />
                New Agency
              </Menu.Item>
            </Menu>
          </Can>

          <Can do="read" on="AdminMenu" field="admin">
            <Menu theme="light" mode="inline" defaultOpenKeys="1">
              {adminMenu.menus.map(menu => (
                <Menu.Item key={menu.key} icon={menu.icon}>
                  <Link to={menu.link} />
                  {menu.text}
                </Menu.Item>
              ))}
            </Menu>
          </Can>
          <Can do="read" on="AdminMenu" field="admin">
            <Menu theme="dark" mode="vertical" selectable={false}>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <MailOutlined />
                    <span>Communications</span>
                  </span>
                }
              >
                <Menu.ItemGroup key="g1" title="Mass Broadcasts">
                  <Menu.Item key="1" icon={<MailOutlined />}>
                    <Link to="/amas" />
                    Mass Emails
                  </Menu.Item>

                  <Menu.Item key="2" icon={<WechatOutlined />}>
                    <Link to="/asms" />
                    Mass SMSs
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g2" title="User broadcasts">
                  <Menu.Item key="3" icon={<MailOutlined />}>
                    <Link to="/single_emails" />
                    Single Emails
                  </Menu.Item>

                  <Menu.Item key="4" icon={<WechatOutlined />}>
                    <Link to="/single_sms" />
                    Single SMSs
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu>
          </Can>

          <Can do="read" on="notMenu" field="resetpassword">
            <Menu theme="dark" mode="inline" selectable={false}>
              {resetPasswordMenu.menus.map(menu => (
                <Menu.Item key={menu.key} icon={menu.icon}>
                  <Link
                    to={`${menu.link}/${id}`}
                    style={{ textDecoration: 'none' }}
                  />
                  {menu.text}
                </Menu.Item>
              ))}
            </Menu>
          </Can>

          <Can do="read" on="Menu" field="superuser">
            <Menu theme="dark" mode="inline" selectable={false}>
              {superUserMenu.menus.map(menu => (
                <Menu.Item key={menu.key} icon={menu.icon}>
                  <Link
                    to={`${menu.link}`}
                    style={{ textDecoration: 'none' }}
                  />
                  {menu.text}
                </Menu.Item>
              ))}
            </Menu>
          </Can>

          <Can do="read" on="BuildingMenu" field="buildingadmin">
            <Menu theme="dark" mode="inline" selectable={false}>
              {buildingAdminMenu.menus.map(menu => (
                <Menu.Item key={menu.key} icon={menu.icon}>
                  <Link
                    to={`${menu.link}/${organization}`}
                    style={{ textDecoration: 'none' }}
                  />
                  {menu.text}
                </Menu.Item>
              ))}
            </Menu>
          </Can>

          <Can do="read" on="TenantMenu" field="tenant">
            <Menu theme="dark" mode="inline" selectable={false}>
              {tenantMenu.menus.map((menuitem, key) => (
                <Menu.Item key={menuitem.key} icon={menuitem.icon}>
                  <Link
                    to={`${menuitem.link}/${organization}`}
                    style={{ textDecoration: 'none' }}
                  />
                  {menuitem.text}
                </Menu.Item>
              ))}
            </Menu>
          </Can>

          <Can do="read" on="defaultMenu" field="nouser">
            <Menu theme="dark" mode="inline">
              {userMenu.menus.map(menu => (
                <Menu.Item key={menu.key} icon={menu.icon}>
                  <Link
                    to={`${menu.link}/${id}`}
                    style={{ textDecoration: 'none' }}
                  />
                  {menu.text}
                </Menu.Item>
              ))}
            </Menu>
          </Can>

          <Can do="read" on="noRoom" field="newRoom">
            <Menu theme="dark" mode="inline">
              {tenantNoRoom.menus.map(menu => (
                <Menu.Item key={menu.key} icon={menu.icon}>
                  <Link
                    to={`${menu.link}`}
                    style={{ textDecoration: 'none' }}
                  />
                  {menu.text}
                </Menu.Item>
              ))}
            </Menu>
          </Can>
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: '0px 5px',
              padding: 16,
              flexGrow: 1,
              height: '600px',
              overflowY: 'auto',
              // background: 'linear-gradient(#7cb1fe, #4b92f8)',
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

Dashboard.propTypes = {
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

export default compose(
  withConnect,
  memo,
)(Dashboard);
