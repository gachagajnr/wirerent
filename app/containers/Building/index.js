/**
 *
 * Building
 *
 */

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  BuildOutlined,
  CommentOutlined,
  DownOutlined,
  InfoOutlined,
  MailOutlined,
  PlusCircleFilled,
  WechatOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import React, { memo, useEffect, useState, useContext } from 'react';
import {
  makeSelectAdmins,
  makeSelectBuilding,
  makeSelectChats,
  makeSelectContacts,
  makeSelectEmails,
  makeSelectName,
  makeSelectNotices,
  makeSelectPayment,
  makeSelectReceipts,
  makeSelectRequests,
  makeSelectRooms,
  makeSelectSms,
  makeSelectTeams,
  makeSelectTenants,
} from './selectors';

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { FormattedMessage } from 'react-intl';
import FrontCard from 'components/FrontCard/index';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import HouseIcon from '@material-ui/icons/House';
import MoreCard from 'components/MoreCard/index';
import GlobalHeader from 'containers/GlobalHeader/index';

import NotesRoundedIcon from '@material-ui/icons/NotesRounded';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PropTypes from 'prop-types';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import app from 'utils/api';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getBuilding } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { AuthContext } from 'utils/AuthContext';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const { Header, Content } = Layout;
const { Text } = Typography;

export function Building({
  building,
  name,
  admins,
  chats,
  contacts,
  emails,
  notices,
  receipts,
  teams,
  rooms,
  sms,
  payment,
  requests,
  tenants,
  doGetBuilding,
}) {
  useInjectReducer({ key: 'building', reducer });
  useInjectSaga({ key: 'building', saga });

  const history = useHistory();
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    doGetBuilding(id);
  }, []);

  app.io.on('buildings patched', function(event) {
    doGetBuilding(id);
  });
  app.io.on('contacts created', function(event) {
    doGetBuilding(id);
  });
  app.io.on('contacts patched', function(event) {
    doGetBuilding(id);
  });
  app.io.on('building-mass-emails created', function(event) {
    doGetBuilding(id);
  });
  app.io.on('building-mass-sms created', function(event) {
    doGetBuilding(id);
  });
  app.io.on('rooms created', function(event) {
    doGetBuilding(id);
  });
  app.io.on('rooms patched', function(event) {
    doGetBuilding(id);
  });
  app.io.on('requests created', function(event) {
    doGetBuilding(id);
  });
  app.io.on('requests patched', function(event) {
    doGetBuilding(id);
  });
  app.io.on('notices created', function(event) {
    doGetBuilding(id);
  });
  app.io.on('contacts created', function(event) {
    doGetBuilding(id);
  });
  app.io.on('contacts patched', function(event) {
    doGetBuilding(id);
  });
  app.io.on('building-admins created', function(event) {
    doGetBuilding(id);
  });
  app.io.on('building-admins patched', function(event) {
    doGetBuilding(id);
  });
  let total = 0;
  let utypes = 0;
  if (name) {
    total = receipts.reduce((prev, next) => +prev + +next.amount, 0);
    utypes = building.utypes.reduce((prev, next) => +prev + +next.total, 0);
    console.log(sms)
  }
  function onClose() {
    setVisible(false);
  }
  return (
    <div>
      <Helmet>
        <title>Building</title>
        <meta name="description" content="Description of Building" />
      </Helmet>
      <Layout>
        <GlobalHeader
          color="#77815c"
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
              <Tooltip title="Create Room" color="cyan">
                <Link to={`/new_un/${id}`}>
                  <Button
                    type="primary"
                    size="small"
                    icon={<PlusCircleFilled color="#fff" />}
                  >
                    New Unit
                  </Button>
                </Link>
              </Tooltip>
              <Tooltip title="Send Mass SMS" color="cyan">
                <Link to={`/xsms/${id}`}>
                  <Button
                    type="primary"
                    size="small"
                    icon={<PlusCircleFilled color="#fff" />}
                  >
                    Mass SMS
                  </Button>
                </Link>
              </Tooltip>
              <Tooltip title="Send Mass Emails" color="cyan">
                <Link to={`/xema/${id}`}>
                  <Button
                    type="primary"
                    size="small"
                    icon={<PlusCircleFilled color="#fff" />}
                  >
                    Mass Emails
                  </Button>
                </Link>
              </Tooltip>
            </Space>,
          ]}
        />
        <Layout className="site-layout">
          <Content style={{ marginTop: 55 }}>
            <Drawer
              title="Payment Details"
              placement="right"
              onClose={onClose}
              visible={visible}
            >
              <p>{payment.mode}</p>
              <p>{payment.accountName}</p>
              <p>{payment.accountNumber}</p>
              <p>{payment.bank}</p>
              <p>{payment.branch}</p>
              <p>{payment.paydescription}</p>
            </Drawer>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FrontCard
                  tagTitle="Bills"
                  value={0}
                  tooltipTitle=" View Bills"
                  to={`/xbi/${id}`}
                  buttonTitle=" View Bills"
                  iconComponent={<PlaylistAddCheckIcon />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FrontCard
                  tagTitle="This Month"
                  value={total}
                  tooltipTitle=" View Transactions"
                  to={`/xtra/${id}`}
                  buttonTitle=" View Transactions"
                  iconComponent={<AccountBalanceIcon />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FrontCard
                  tagTitle="Units"
                  value={rooms.length}
                  tooltipTitle=" View Units"
                  prefix={`/${utypes}`}
                  to={`/xun/${id}`}
                  buttonTitle=" View Units"
                  iconComponent={<HouseIcon />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FrontCard
                  tagTitle="Admins"
                  value={admins.length}
                  tooltipTitle=" View Admins"
                  to={`/xadm/${id}`}
                  buttonTitle=" View Building Admins"
                  iconComponent={<SupervisorAccountIcon />}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs>
                <FrontCard
                  tagTitle="Vacant Rooms"
                  value={building.vacants.length}
                  tooltipTitle="View Vacants"
                  to={`/xun/${id}`}
                  buttonTitle="View Vacants"
                  iconComponent={
                    <AssignmentTurnedInIcon style={{ color: '#001529' }} />
                  }
                />
              </Grid>
              <Grid item xs>
                <FrontCard
                  tagTitle="Moving Tenants"
                  value={tenants.length}
                  tooltipTitle="View Moving"
                  to={`/xte/${id}`}
                  buttonTitle="View Moving"
                  iconComponent={
                    <SupervisorAccountIcon style={{ color: '#001529' }} />
                  }
                />
              </Grid>

              <Grid item xs>
                <FrontCard
                  tagTitle="Mass Emails"
                  value={emails.length}
                  tooltipTitle="View Mass Emails"
                  to={`/xema/${id}`}
                  buttonTitle="View Mass Emails"
                  style={{ backgroundColor: '#189eff' }}
                  iconComponent={
                    <SupervisorAccountIcon style={{ color: '#001529' }} />
                  }
                />
              </Grid>
              <Grid item xs>
                <FrontCard
                  tagTitle="Mass SMS"
                  value={sms.length}
                  tooltipTitle="View SMS"
                  to={`/xsms/${id}`}
                  buttonTitle="View SMS"
                  style={{ backgroundColor: '#189eff' }}
                  iconComponent={
                    <SupervisorAccountIcon style={{ color: '#001529' }} />
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs>
                <MoreCard
                  statTitle="Reqs/Complaints"
                  value={requests.length}
                  tooltipTitle=" View Requests"
                  to={`/xreq/${id}`}
                  // toAction={`/buildingrequests/${id}`}
                  buttonTitle=" View Requests"
                  prefix={<AssignmentIcon />}
                  suffix="Total"
                  // buttonAction="Assign Ref"
                  tooltipActionTitle="Assign Referee"
                />
              </Grid>
              <Grid item xs>
                <MoreCard
                  statTitle="Notices"
                  value={notices.length}
                  tooltipTitle=" Go To Published Notices"
                  to={`/xnot/${id}`}
                  toAction={`/new_b_not/${id}`}
                  buttonTitle=" Published Notices"
                  prefix={<NotesRoundedIcon />}
                  suffix="Published"
                  buttonAction="Publish New"
                  tooltipActionTitle="Publish Notice"
                />
              </Grid>
              <Grid item xs>


                <MoreCard
                  statTitle="Important Contacts"
                  value={contacts.length}
                  tooltipTitle=" Go To Contacts"
                  to={`/xcon/${id}`}
                  toAction={`/new_xcon/${id}`}
                  buttonTitle=" Contacts"
                  prefix={<SupervisorAccountIcon />}
                  suffix="Created"
                  buttonAction="Create New"
                  tooltipActionTitle="Add Contacts"
                />
              </Grid>
              <Grid item xs>
                <Card
                  // style={{ textAlign: 'center' }}
                  title={name}
                  bordered
                  size="default"
                  cover={
                    <Row justify="space-around" align="middle">
                      <Col flex={2} />
                      <Col flex={3}>
                        <div
                          style={{
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            // border: '1px solid red',
                            padding: 10,
                            // borderRadius: 5,
                          }}
                        >
                          <Tooltip title="Building Code">
                            <Text copyable style={{ padding: 5 }}>
                              {building.code}
                            </Text>
                          </Tooltip>
                          <Tooltip title="Payment Info">
                            <Button
                              onClick={() => setVisible(true)}
                              block
                              icon={<ArrowRightOutlined />}
                              type="primary"
                              style={{ color: '#fff' }}
                              danger
                            >
                              View Payment Info
                            </Button>
                          </Tooltip>
                        </div>
                      </Col>
                    </Row>
                  }
                  extra={[
                    <a key="fsjds" href="/edit">
                      Edit Info
                    </a>,
                  ]}
                >
                  <div style={{ textAlign: 'center' }}>
                    <Space direction="vertical">
                      <Typography level={4}>
                        Location:
                        <Tag color="green"> {building.location}</Tag>
                      </Typography>
                      <Typography level={4}>
                        Street:
                        <Tag color="green"> {building.street}</Tag>
                      </Typography>
                      <Typography level={4}>
                        Description:
                        <Tag color="green"> {building.description}</Tag>
                      </Typography>
                      <Typography level={4}>
                        Caretaker:
                        <Tag color="green">{building.caretakerName}</Tag>
                      </Typography>
                      <Typography level={4}>
                        Tel:
                        <Tag color="green">{building.caretakerPhone}</Tag>
                      </Typography>

                      <Link to={`/xinf/${id}`}>
                        <Button
                          block
                          size="small"
                          type="primary"
                          style={{ color: '#000' }}
                          icon={<InfoOutlined color="blue" />}
                        >
                          Full Profile
                        </Button>
                      </Link>
                    </Space>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

Building.propTypes = {
  doGetBuilding: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  admins: PropTypes.object.isRequired,
  chats: PropTypes.object.isRequired,
  contacts: PropTypes.object.isRequired,
  emails: PropTypes.object.isRequired,
  notices: PropTypes.object.isRequired,
  receipts: PropTypes.object.isRequired,
  teams: PropTypes.object.isRequired,
  rooms: PropTypes.object.isRequired,
  sms: PropTypes.object.isRequired,
  tenants: PropTypes.object.isRequired,
  payment: PropTypes.object.isRequired,
  requests: PropTypes.object.isRequired,
  building: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  building: makeSelectBuilding(),
  name: makeSelectName(),
  admins: makeSelectAdmins(),
  chats: makeSelectChats(),
  contacts: makeSelectContacts(),
  emails: makeSelectEmails(),
  notices: makeSelectNotices(),
  receipts: makeSelectReceipts(),
  teams: makeSelectTeams(),
  rooms: makeSelectRooms(),
  sms: makeSelectSms(),
  tenants: makeSelectTenants(),
  payment: makeSelectPayment(),
  requests: makeSelectRequests(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetBuilding: id => dispatch(getBuilding(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Building);
