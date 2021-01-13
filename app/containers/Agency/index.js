import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Layout,
  Menu,
  Row,
  Space,
  Statistic,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import {
  CloudFilled,
  DollarOutlined,
  DownOutlined,
  HomeFilled,
  InfoOutlined,
  MailOutlined,
  PhoneFilled,
  PlusCircleFilled,
  TeamOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import React, { memo, useContext, useEffect } from 'react';
import {
  makeSelectAdmins,
  makeSelectAgency,
  makeSelectAgencyName,
  makeSelectBuildings,
  makeSelectEmails,
  makeSelectMoving,
  makeSelectNotices,
  makeSelectSms,
  makeSelectTenants,
  makeSelectTransactions,
  makeSelectUnits,
  makeSelectVTransactions,
} from './selectors';

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ApartmentIcon from '@material-ui/icons/Apartment';
import { AuthContext } from 'utils/AuthContext';
import EmailIcon from '@material-ui/icons/Email';
import { FormattedMessage } from 'react-intl';
import FrontCard from 'components/FrontCard/index';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import HouseIcon from '@material-ui/icons/House';
import GlobalHeader from 'containers/GlobalHeader/index';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PropTypes from 'prop-types';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TextsmsIcon from '@material-ui/icons/Textsms';
import app from 'utils/api';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAgency } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export function Agency({
  agency,
  name,
  buildings,
  rooms,
  notices,
  tenants,
  admins,
  emails,
  sms,
  moving,
  transactions,
  doGetAgency,
}) {
  useInjectReducer({ key: 'agency', reducer });
  useInjectSaga({ key: 'agency', saga });

  const { user } = useContext(AuthContext);

  const { organization } = user.user;

  app.io.on('agents patched', function(data) {
    doGetAgency(user.user.organization);
  });
  app.io.on('rooms created', function(data) {
    doGetAgency(user.user.organization);
  });
  app.io.on('rooms patched', function(data) {
    doGetAgency(user.user.organization);
  });
  app.io.on('receipts created', function(data) {
    doGetAgency(user.user.organization);
  });
  app.io.on('buildings created', function(data) {
    doGetAgency(user.user.organization);
  });
  app.io.on('notices created', function(data) {
    doGetAgency(user.user.organization);
  });
  app.io.on('mass-sms created', function(data) {
    doGetAgency(user.user.organization);
  });
  app.io.on('mass-sms removed', function(data) {
    doGetAgency(user.user.organization);
  });
  app.io.on('mass-emails created', function(data) {
    doGetAgency(user.user.organization);
  });
  app.io.on('admins created', function(data) {
    doGetAgency(user.user.organization);
  });
  // app.io.on('rooms created', function(data) {
  //   doGetAgency(user.user.organization);
  // });
  useEffect(() => {
    doGetAgency(user.user.organization);
  }, []);

  let total,
    vtotal = 0;

  if (name) {
    total = transactions.reduce((prev, next) => +prev + +next.amount, 0);
    vtotal = agency.vtransactions.reduce(
      (prev, next) => +prev + +next.amount,
      0,
    );
  }
  return (
    <div>
      <Helmet>
        <title>Agency</title>
        <meta name="description" content="Description of Agency" />
      </Helmet>
      <Layout>
        <GlobalHeader
          title={name}
          role={user.user.role}
          other={
            <Space>
              <Text type="danger" />
            </Space>
          }
          className="site-page-header"
          extra={[
            <Space>
              <Tooltip title="Create Building" color="cyan">
                <Link to="/new_building">
                  <Button
                    type="primary"
                    size="small"
                    icon={<PlusCircleFilled color="#fff" />}
                  >
                    New Building
                  </Button>
                </Link>
              </Tooltip>
              <Tooltip title="Agency Team" color="cyan">
                <Link to="/ate">
                  <Button
                    type="primary"
                    size="small"
                    icon={<PlusCircleFilled color="#fff" />}
                  >
                    Teams
                  </Button>
                </Link>
              </Tooltip>
              <Tooltip title="Requests" color="cyan">
                <Link to="/requests">
                  <Button
                    type="primary"
                    size="small"
                    icon={<PlusCircleFilled color="#fff" />}
                  >
                    Requests
                  </Button>
                </Link>
              </Tooltip>
            </Space>,
          ]}
        />
        <Layout>
          <Content style={{ marginTop: 55 }}>
            <Grid container spacing={2}>
              <Grid item xs>
                <Card
                  size="small"
                  title="Receipts"
                  hoverable
                  bordered
                  style={{ borderRadius: 5 }}
                  extra={<Link to="/transactions">View Transactions</Link>}
                >
                  <Statistic
                    prefix={<AccountBalanceIcon style={{ color: '#acdaff' }} />}
                    value={vtotal}
                    valueStyle={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#FFD700',
                    }}
                    suffix={`/${total} Valid`}
                  />
                </Card>
              </Grid>
              <Grid item xs>
                <Card
                  size="small"
                  title="Transactions"
                  style={{ borderRadius: 5 }}
                  hoverable
                  bordered
                  extra={<Link to="/transactions">View Transactions</Link>}
                >
                  <Statistic
                    prefix={<DollarOutlined style={{ color: '#acdaff' }} />}
                    valueStyle={{
                      fontSize: 20,
                      color: '#dc143c',
                      fontWeight: 'bold',
                    }}
                    value={agency.vtransactions.length}
                    suffix={`/${agency.transactions.length} Verified`}
                    precision={0}
                  />
                </Card>
              </Grid>
              <Grid item xs>
                <Card
                  size="small"
                  title="Buildings"
                  style={{ borderRadius: 5 }}
                  hoverable
                  bordered
                  extra={<Link to="/buildings">View Buildings</Link>}
                >
                  <Statistic
                    prefix={<ApartmentIcon style={{ color: '#acdaff' }} />}
                    value={buildings.length}
                    valueStyle={{
                      fontSize: 20,
                      color: '#dc143c',
                      fontWeight: 'bold',
                    }}
                    suffix=""
                  />
                </Card>
              </Grid>
              <Grid item xs>
                <Card
                  size="small"
                  title="Units"
                  hoverable
                  style={{ borderRadius: 5 }}
                  bordered
                  extra={<Link to="/units">View Units</Link>}
                >
                  <Statistic
                    prefix={<HouseIcon style={{ color: '#acdaff' }} />}
                    value={agency.vacants.length}
                    valueStyle={{
                      fontSize: 20,
                      color: '#dc143c',
                      fontWeight: 'bold',
                    }}
                    suffix={`/${rooms.length} Vacant`}
                  />
                </Card>
              </Grid>{' '}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs>
                <Card
                  size="small"
                  style={{ borderRadius: 5 }}
                  title="Agency Admins"
                  hoverable
                  bordered
                >
                  <Statistic
                    prefix={
                      <SupervisorAccountIcon style={{ color: '#acdaff' }} />
                    }
                    value={admins.length}
                    valueStyle={{
                      fontSize: 18,
                      color: '#dc143c',
                      fontWeight: 'bold',
                    }}
                    suffix=""
                  />
                  <Link to="/aadm">View Admins</Link>
                </Card>
              </Grid>
              <Grid item xs>
                <Card
                  size="small"
                  style={{ borderRadius: 5 }}
                  title="Requests"
                  hoverable
                  bordered
                >
                  <Statistic
                    prefix={<NotificationsIcon style={{ color: '#acdaff' }} />}
                    value={agency.requests.length}
                    valueStyle={{
                      fontSize: 20,
                      color: '#dc143c',
                      fontWeight: 'bold',
                    }}
                    suffix=""
                  />
                  <Link to="/requests">View Requests</Link>
                </Card>
              </Grid>
              <Grid item xs>
                <Card
                  size="small"
                  style={{ borderRadius: 5 }}
                  title="Teams"
                  hoverable
                  bordered
                >
                  <Statistic
                    prefix={<TeamOutlined style={{ color: '#acdaff' }} />}
                    value={agency.teams.length}
                    valueStyle={{
                      fontSize: 18,
                      color: '#dc143c',
                      fontWeight: 'bold',
                    }}
                    suffix={`/${agency.requests.length} Requests`}
                  />
                  <Link to="/ate">View Teams</Link>
                </Card>
              </Grid>
              <Grid item xs>
                <Card
                  size="small"
                  title="Moving Tenants"
                  style={{ borderRadius: 5 }}
                  hoverable
                  bordered
                >
                  <Statistic
                    prefix={
                      <SupervisorAccountIcon style={{ color: '#acdaff' }} />
                    }
                    value={moving.length}
                    valueStyle={{
                      fontSize: 18,
                      color: '#dc143c',
                      fontWeight: 'bold',
                    }}
                    suffix=""
                  />
                  <Link to="/moving">View Moving</Link>
                </Card>
              </Grid>
              <Grid item xs>
                <Card
                  size="small"
                  style={{ borderRadius: 5 }}
                  title="Mass Sms"
                  hoverable
                  bordered
                >
                  <Statistic
                    prefix={<TextsmsIcon style={{ color: '#acdaff' }} />}
                    value={sms.length}
                    valueStyle={{
                      fontSize: 15,
                      color: '#dc143c',
                      fontWeight: 'bold',
                    }}
                    suffix=""
                  />
                  <Link to="/asms">View Mass Sms</Link>
                </Card>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs>
                <Card
                  size="small"
                  style={{ borderRadius: 5 }}
                  title="Mass Emails"
                  hoverable
                  bordered
                >
                  <Statistic
                    prefix={<EmailIcon style={{ color: '#acdaff' }} />}
                    value={emails.length}
                    valueStyle={{
                      fontSize: 15,
                      color: '#dc143c',
                      fontWeight: 'bold',
                    }}
                    suffix=""
                  />
                  <Link to="/amas">View Mass Emails</Link>
                </Card>
              </Grid>
              <Grid item xs>
                <Card
                  size="small"
                  style={{ borderRadius: 5 }}
                  title="Single Sms"
                  hoverable
                  bordered
                >
                  <Statistic
                    prefix={<TextsmsIcon style={{ color: '#acdaff' }} />}
                    value={agency.single_sms.length}
                    valueStyle={{
                      fontSize: 18,
                      color: '#dc143c',
                      fontWeight: 'bold',
                    }}
                    suffix=""
                  />
                  <Link to="/single_sms">View Texts</Link>
                </Card>
              </Grid>
              <Grid item xs>
                <Card
                  size="small"
                  style={{ borderRadius: 5 }}
                  title="Single Emails"
                  hoverable
                  bordered
                >
                  <Statistic
                    prefix={<NotificationsIcon style={{ color: '#acdaff' }} />}
                    value={agency.single_emails.length}
                    valueStyle={{
                      fontSize: 18,
                      color: '#dc143c',
                      fontWeight: 'bold',
                    }}
                    suffix=""
                  />
                  <Link to="/single_emails">View Mails</Link>
                </Card>
              </Grid>

              <Grid item xs>
                <Card
                  size="small"
                  style={{ borderRadius: 5 }}
                  // title={info.agent.name}
                  bordered
                  cover={
                    <Avatar
                      size={64}
                      style={{
                        margin: 10,
                        backgroundColor: '#94d2ab',

                        border: '1px solid white',
                        verticalAlign: 'middle',
                      }}
                    >
                      {name.toUpperCase().match(/\b(\w)/g)}
                    </Avatar>
                  }
                  // style={{ backgroundColor: '#eee' }}
                  extra={<a href="/edit">Edit Info</a>}
                  // style={{ width: 300 }}
                >

                    <Typography level={4}>
                      <MailOutlined />
                      <Tag color="blue"> {agency.email}</Tag>
                    </Typography>

                    <Typography level={4}>
                      <CloudFilled />
                      <Tag color="blue"> {agency.website}</Tag>
                    </Typography>

                    <Typography level={4}>
                      <PhoneFilled />
                      <Tag color="blue"> {agency.phone}</Tag>
                    </Typography>
                    <Typography level={4}>
                      <HomeFilled />
                      <Tag color="blue">{agency.address}</Tag>
                    </Typography>
                    <Link to="/apro">
                      <Button
                        block
                        size="small"
                        type="primary"
                        icon={<InfoOutlined color="#fff" />}
                      >
                        Full Info
                      </Button>
                    </Link>

                </Card>
              </Grid>
            </Grid>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

Agency.propTypes = {
  doGetAgency: PropTypes.func.isRequired,
  agency: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  buildings: PropTypes.object.isRequired,
  rooms: PropTypes.object.isRequired,
  admins: PropTypes.object.isRequired,
  tenants: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
  emails: PropTypes.array.isRequired,
  sms: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  agency: makeSelectAgency(),
  name: makeSelectAgencyName(),
  buildings: makeSelectBuildings(),
  rooms: makeSelectUnits(),
  admins: makeSelectAdmins(),
  notices: makeSelectNotices(),
  tenants: makeSelectTenants(),
  moving: makeSelectMoving(),

  transactions: makeSelectTransactions(),
  emails: makeSelectEmails(),
  sms: makeSelectSms(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetAgency: organization => dispatch(getAgency(organization)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Agency);
