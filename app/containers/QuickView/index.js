/**
 *
 * QuickView
 *
 */

import 'chartjs-plugin-datalabels';

import {
  AlertOutlined,
  ApartmentOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  DownOutlined,
  HomeOutlined,
  MailOutlined,
  NotificationOutlined,
  PlusCircleFilled,
  RedoOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Bar,
  Doughnut,
  HorizontalBar,
  Line,
  Pie,
  Polar,
  Radar,
} from 'react-chartjs-2';
import { Button, Card, Dropdown, Layout, Menu, Statistic, Tooltip } from 'antd';
import { Link, useParams } from 'react-router-dom';
import React, { memo, useContext, useEffect, useRef } from 'react';
import {
  makeSelectAgency,
  makeSelectTransactions,
} from 'containers/Agency/selectors';

import { AuthContext } from 'utils/AuthContext';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import SmsIcon from '@material-ui/icons/Sms';
import app from 'utils/api';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAgency } from 'containers/Agency/actions';
import makeSelectQuickView from './selectors';
import messages from './messages';
import reducer from 'containers/Agency/reducer';
import saga from 'containers/Agency/saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const { Content } = Layout;

export function QuickView({ agency, transactions, doGetAgency }) {
  useInjectReducer({ key: 'agency', reducer });
  useInjectSaga({ key: 'agency', saga });
  const id = 1;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    doGetAgency(user.user.organization);
  }, []);

  app.io.on('receipts created', function(event) {
    doGetAgency(user.user.organization);
  });
  app.io.on('buildings created', function(event) {
    doGetAgency(user.user.organization);
  });
  app.io.on('rooms created', function(event) {
    doGetAgency(user.user.organization);
  });
  app.io.on('rooms patched', function(event) {
    doGetAgency(user.user.organization);
  });
  app.io.on('mass-emails created', function(event) {
    doGetAgency(user.user.organization);
  });
  app.io.on('mass-emails removed', function(event) {
    doGetAgency(user.user.organization);
  });
  app.io.on('mass-sms created', function(event) {
    doGetAgency(user.user.organization);
  });
  app.io.on('mass-sms removed', function(event) {
    doGetAgency(user.user.organization);
  });
  app.io.on('teams patched', function(event) {
    doGetAgency(user.user.organization);
  });
  app.io.on('teams created', function(event) {
    doGetAgency(user.user.organization);
  });
  app.io.on('requests created', function(event) {
    doGetAgency(user.user.organization);
  });
  app.io.on('notices created', function(event) {
    doGetAgency(user.user.organization);
  });
  let total = 0;

  if (agency.name) {
    total = agency.vtransactions.reduce(
      (prev, next) => +prev + +next.amount,
      0,
    );
  }
  let ta = [0, 0, 0];
  let ye = ['', '', ''];
  let verified = 0;
  let unverified = 0;
  let vacantrooms = 0;
  let singleemails = 0;
  let singlesms = 0;
  let occupied = 0;
  let requested = 0;
  let emails = 0;
  let receipts = ['', '', ''];
  let sms = 0;
  let units = 0;
  let vacants = [];

  if (agency.name) {
    ye = agency.buildings.map(rooms => rooms.name);
    receipts = agency.buildings.map(rooms =>
      rooms.receipts.data.reduce((prev, next) => +prev + +next.amount, 0),
    );
    units = agency.buildings.map(rooms =>
      rooms.utypes.reduce((a, b) => +a + +b.total, 0),
    );
    verified = agency.vtransactions.length;
    unverified = agency.transactions.length;
    vacantrooms = agency.vacants.length;
    requested = agency.rtransactions.length;
    //  console.log(requested)

    occupied = agency.rooms.length - agency.vacants.length;
    emails = agency.emails.length;
    sms = agency.sms.length;
    singleemails = agency.single_emails.length;
    singlesms = agency.single_sms.length;
    ta = agency.buildings.map(rooms => rooms.rooms.data.length);
    vacants = agency.buildings.map(rooms => rooms.vacants.data.length);
    // console.log(agency)
  }
  const data = {
    datasets: [
      {
        data: [verified, unverified, requested],
        backgroundColor: ['#296c92', '#3eb489', '#ff0000'],
        hoverBackgroundColor: ['#aedee0', '#4B5000', '#ff00ff'],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['Verified', 'NotVerified', 'Receipt Requested'],
  };
  const broomdata = {
    datasets: [
      {
        data: units,
        backgroundColor: ['#aedee0', '#001529', '#ff00ff'],
        hoverBackgroundColor: ['#aedee0', '#4B5000', '#ff00ff'],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ye,
  };
  const singlecommdata = {
    datasets: [
      {
        data: [singleemails, singlesms],
        backgroundColor: ['#aedee0', '#C9DE00'],
        hoverBackgroundColor: ['#001529', '#4B5000'],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['Single Emails', 'Single Sms'],
  };
  const commdata = {
    datasets: [
      {
        data: [emails, sms],
        backgroundColor: ['#aedee0', '#C9DE00'],
        hoverBackgroundColor: ['#001529', '#4B5000'],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['Emails', 'Sms'],
  };
  const vaccdata = {
    datasets: [
      {
        data: [vacantrooms, occupied],
        backgroundColor: ['#FF0000', '#aedee0'],
        hoverBackgroundColor: ['#FF0000', '#aedee0'],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['Vacants', 'Occupied'],
  };
  const bardata = {
    labels: ye,
    datasets: [
      {
        label: 'Rooms',
        backgroundColor: '#3eb489',
        // borderColor: 'rgba(75,192,192,1)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#000',
        fill: true,
        barPercentage: 0.5,
        barThickness: 15,
        maxBarThickness: 15,
        minBarLength: 2,
        data: ta,
      },
    ],
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behavior of full-width/height
      plugins: {
        datalabels: {
          display: ctx => {
            return true;
          },
          formatter: (ctx, data) => {
            return `${data.dataIndex}`;
          },
        },
      },
    },
  };
  const receiptdata = {
    labels: ye,
    type: 'horizontalBar',

    datasets: [
      {
        label: 'Receipts',
        backgroundColor: '#d96704',
        borderColor: 'rgba(75,192,192,1)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        barPercentage: 0.5,
        fill: true,
        barThickness: 15,
        maxBarThickness: 15,
        minBarLength: 2,
        data: receipts,
      },
    ],
    options: {
      // type: 'horizontalBar',
      labels: {
        render: 'value',
        // arc: true,
        position: 'outside',
      },
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behavior of full-width/height
    },
  };
  const vacantdata = {
    labels: ye,
    datasets: [
      {
        label: 'Vacants',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        barPercentage: 0.5,
        fill: true,
        barThickness: 15,
        maxBarThickness: 15,
        minBarLength: 2,
        data: vacants,
      },
    ],
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      labels: {
        render: 'label',
        fontColor: '#000',
        position: 'outside',
      },
    },
  };
  return (
    <div>
      <Helmet>
        <title>QuickView</title>
        <meta name="description" content="Description of QuickView" />
      </Helmet>
      <Layout>
        <Layout className="site-layout">
          <Content style={{ padding: 0 }}>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs>
                <Card title="Buildings" size="small">
                  <Statistic
                    value={agency.buildings.length}
                    valueStyle={{ color: '#001529', fontSize: 20 }}
                    prefix={<ApartmentOutlined />}
                    suffix={
                      <Link to="/buildings">
                        <Button
                          style={{ margin: 'auto' }}
                          size="small"
                          type="primary"
                          ghost
                        >
                          View
                        </Button>
                      </Link>
                    }
                  />
                </Card>
              </Grid>
              <Grid item xs>
                <Card title="Requests" size="small">
                  <Statistic
                    value={agency.requests.length}
                    prefix={<ApartmentOutlined />}
                    valueStyle={{ color: '#001529', fontSize: 20 }}
                    suffix={
                      <Link to="/requests">
                        <Button
                          style={{ margin: 'auto' }}
                          size="small"
                          type="primary"
                          ghost
                        >
                          Attend
                        </Button>
                      </Link>
                    }
                  />
                </Card>
              </Grid>
              <Grid item xs>
                <Card title="Total Verified" size="small">
                  <Link to="/transactions">
                    <Statistic
                      value={total}
                      prefix={<ApartmentOutlined />}
                      valueStyle={{ color: '#ff0000', fontSize: 15 }}
                      suffix={
                        <Button
                          style={{ margin: 'auto' }}
                          size="small"
                          type="primary"
                          ghost
                        >
                          Verify Receipts
                        </Button>
                      }
                    />
                  </Link>
                </Card>
              </Grid>
              <Grid item xs>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <Tooltip title="Create Building">
                          <Link to="/new_building">
                            <Button
                              type="text"
                              size="small"
                              icon={<PlusCircleFilled color="#fff" />}
                            >
                              New Building
                            </Button>
                          </Link>
                        </Tooltip>
                      </Menu.Item>
                      <Menu.Item>
                        <Tooltip title="Agency Team">
                          <Link to="/new_ate">
                            <Button
                              type="text"
                              size="small"
                              icon={<PlusCircleFilled color="#fff" />}
                            >
                              New Team
                            </Button>
                          </Link>
                        </Tooltip>
                      </Menu.Item>
                      <Menu.Item>
                        <Tooltip title="Requests">
                          <Link to="/requests">
                            <Button
                              type="text"
                              size="small"
                              icon={<PlusCircleFilled color="#fff" />}
                            >
                              Requests
                            </Button>
                          </Link>
                        </Tooltip>
                      </Menu.Item>
                      <Menu.Item>
                        <Tooltip title="Moving Requests">
                          <Link to={`/moving`}>
                            <Button
                              type="text"
                              size="small"
                              icon={<PlusCircleFilled color="#fff" />}
                            >
                              Moving Tenants
                            </Button>
                          </Link>
                        </Tooltip>
                      </Menu.Item>
                      <Menu.Item>
                        <Tooltip title="Mass Emails(Agency)">
                          <Link to="/amas">
                            <Button
                              type="text"
                              size="small"
                              icon={<PlusCircleFilled color="#fff" />}
                            >
                              Mass Emails
                            </Button>
                          </Link>
                        </Tooltip>
                      </Menu.Item>
                      <Menu.Item>
                        <Tooltip title="Mass SMS(Agency)">
                          <Link to="/asms">
                            <Button
                              type="text"
                              size="small"
                              icon={<PlusCircleFilled color="#fff" />}
                            >
                              Mass SMS
                            </Button>
                          </Link>
                        </Tooltip>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button
                    type="primary"
                    size="small"
                    style={{ color: '#001529' }}
                    className="ant-dropdown-link"
                  >
                    QUICK MENU <DownOutlined style={{ color: '#001529' }} />
                  </Button>
                </Dropdown>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs>
                <Card title="Receipts Summary" size="small">
                  <Pie
                    data={data}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      legend: {
                        display: true,
                        position: 'right',
                      },
                    }}
                  />
                </Card>
              </Grid>

              <Grid item xs>
                <Card title="Occupancy" size="small">
                  <Doughnut
                    data={vaccdata}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,

                      legend: {
                        display: true,
                        position: 'right',
                      },
                    }}
                  />
                </Card>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={1}
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs>
                <Card title="Receipts Sum" size="small">
                  <HorizontalBar
                    data={receiptdata}
                    // width={100}
                    // height={50}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      legend: {
                        display: true,
                        position: 'bottom',
                      },
                      scales: {
                        xAxes: [
                          {
                            ticks: { display: true },
                            gridLines: {
                              display: true,
                              drawBorder: true,
                            },
                          },
                        ],
                        yAxes: [
                          {
                            ticks: { display: true },
                            gridLines: {
                              display: true,
                              drawBorder: true,
                            },
                          },
                        ],
                      },
                    }}
                  />
                </Card>
              </Grid>
              <Grid item xs>
                <Card title="Rooms Created" size="small">
                  <HorizontalBar
                    data={bardata}
                    // width={100}
                    // height={50}
                    options={{
                      responsive: true,
                      scales: {
                        xAxes: [
                          {
                            ticks: { display: true },
                            gridLines: {
                              display: true,
                              drawBorder: false,
                            },
                          },
                        ],
                        yAxes: [
                          {
                            ticks: { display: true },
                            gridLines: {
                              display: true,
                              drawBorder: false,
                            },
                          },
                        ],
                      },
                      maintainAspectRatio: false,
                      legend: {
                        display: true,
                        position: 'bottom',
                      },
                    }}
                  />
                </Card>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs>
                <Card title="Vacant Units" size="small">
                  <HorizontalBar
                    data={vacantdata}
                    // width={100}
                    // height={50}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      layout: {
                        padding: {
                          top: 5,
                          left: 15,
                          right: 15,
                          bottom: 15,
                        },
                      },
                      scales: {
                        xAxes: [
                          {
                            ticks: { display: true },
                            gridLines: {
                              display: false,
                              drawBorder: false,
                            },
                          },
                        ],
                        yAxes: [
                          {
                            ticks: { display: true },
                            gridLines: {
                              display: false,
                              drawBorder: false,
                            },
                          },
                        ],
                      },

                      legend: {
                        display: true,
                        position: 'right',
                      },
                    }}
                  />
                </Card>
              </Grid>
              <Grid item xs>
                <Card title="Total Rooms/Building" size="small">
                  <Polar
                    data={broomdata}
                    // width={100}
                    // height={50}
                    options={{
                      labels: {
                        render: 'label',
                        fontColor: '#000',
                        position: 'outside',
                      },
                      responsive: true,
                      maintainAspectRatio: false,

                      legend: {
                        display: true,
                        position: 'right',
                      },
                    }}
                  />
                </Card>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
              <Grid item xs>
                <Card title="Personal Email/Sms" size="small">
                  <Doughnut
                    data={singlecommdata}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      legend: {
                        display: true,
                        position: 'right',
                      },
                    }}
                  />
                </Card>
              </Grid>
              <Grid item xs>
                <Card title="Mass Communications" size="small">
                  <Doughnut
                    data={commdata}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,

                      legend: {
                        display: true,
                        position: 'right',
                      },
                    }}
                  />
                </Card>
              </Grid>
            </Grid>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

QuickView.propTypes = {
  doGetAgency: PropTypes.func,
  agency: PropTypes.node,
  transactions: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  quickView: makeSelectQuickView(),
  agency: makeSelectAgency(),
  transactions: makeSelectTransactions(),
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
)(QuickView);
