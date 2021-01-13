/**
 *
 * AgencyTeams
 *
 */

import React, { memo, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useParams, useHistory, Link } from 'react-router-dom';
import {
  Button,
  List,
  Tooltip,
  Typography,
  Menu,
  Popconfirm,
  Collapse,
  Layout,
  Row,
  Space,
  Dropdown,
  Tag,
  Col,
  Avatar,
} from 'antd';

import {
  UserSwitchOutlined,
  CaretRightOutlined,
  PlusCircleOutlined,
  ArrowLeftOutlined,
  EditFilled,
} from '@ant-design/icons';
import Grid from '@material-ui/core/Grid';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectAgencyName } from 'containers/Agency/selectors';
import { AuthContext } from 'utils/AuthContext';
import { makeSelectAgencyTeams } from './selectors';
import { getA_Teams } from './actions';
import GlobalHeader from 'containers/GlobalHeader/index';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { Header, Content } = Layout;

const { Panel } = Collapse;
const { Text } = Typography;

export function AgencyTeams({ a_teams, name, doGetA_Teams }) {
  useInjectReducer({ key: 'agencyTeams', reducer });
  useInjectSaga({ key: 'agencyTeams', saga });
  const { id } = useParams();
  const history = useHistory();
  const [top, setTop] = useState('none');
  const [size, setSize] = useState('small');
  const [bottom, setBottom] = useState('bottomRight');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    doGetA_Teams(user.user.organization);
  }, []);

  return (
    <div>
      <Helmet>
        <title>AgencyTeams</title>
        <meta name="description" content="Description of AgencyTeams" />
      </Helmet>
      <Layout>
        <GlobalHeader
          title={` ${name}Teams`}
          role={user.user.role}
          other={
            <Space>
              <Tag color="success">Total</Tag>
              <Text type="danger">DFfdfd</Text>
            </Space>
          }
          className="site-page-header"
          extra={[
            <Tooltip title="Create Team">
              <Link to="/new_ate">
                <Button
                  type="primary"
                  size="small"
                  icon={<PlusCircleOutlined style={{ color: '#fff' }} />}
                >
                  Create Team
                </Button>
              </Link>
            </Tooltip>,
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item onClick={e => setTop('topLeft')}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      // href="http://www.alipay.com/"
                    >
                      Top Left
                    </a>
                  </Menu.Item>
                  <Menu.Item onClick={e => setTop('topRight')}>
                    <a target="_blank" rel="noopener noreferrer">
                      Top Right
                    </a>
                  </Menu.Item>
                  <Menu.Item onClick={e => setBottom('bottomLeft')}>
                    <a target="_blank" rel="noopener noreferrer">
                      Bottom Left
                    </a>
                  </Menu.Item>
                  <Menu.Item onClick={e => setBottom('bottomRight')}>
                    <a target="_blank" rel="noopener noreferrer">
                      Bottom Right
                    </a>
                  </Menu.Item>
                  <Menu.Item onClick={e => setTop('none')}>
                    <a target="_blank" rel="noopener noreferrer">
                      None
                    </a>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomRight"
            >
              <Button size="small">Pagination</Button>
            </Dropdown>,
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item onClick={e => setSize('small')}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      // href="http://www.alipay.com/"
                    >
                      Small
                    </a>
                  </Menu.Item>
                  <Menu.Item onClick={e => setSize('middle')}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      // href="http://www.taobao.com/"
                    >
                      Middle
                    </a>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomRight"
            >
              <Button size="small">Table Size</Button>
            </Dropdown>,
          ]}
        />
        <Layout className="site-layout">
          <Content style={{ marginTop: 55 }}>
            <List
              rowKey="expertise"
              // className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={a_teams}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Popconfirm
                      title="Are you sure Revoke this Team?"
                      onConfirm={() => alert()}
                      onCancel={() => alert()}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a href="/#" key="list-loadmore-more">
                        Revoke
                      </a>
                    </Popconfirm>,
                    <Tooltip title="Team Tasks">
                      <Link to={`/teaminfo/${item._id}`}>
                        <Button
                          type="primary"
                          size="small"
                          icon={<EditFilled style={{ color: '#fff' }} />}
                        >
                          Tasks
                        </Button>
                      </Link>
                    </Tooltip>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="circle"
                        style={{ backgroundColor: 'blue' }}
                      >
                        {item.members.length}
                      </Avatar>
                    }
                    title={item.expertise}
                    // description={"Leader: "+item.leader_name}
                    description={
                      <Collapse
                        bordered={false}
                        expandIcon={({ isActive }) => (
                          <CaretRightOutlined rotate={isActive ? 90 : 0} />
                        )}
                      >
                        <Panel
                          header={
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <UserSwitchOutlined />
                                {item.leader_name}
                              </Grid>
                              <Grid item xs={12}>
                                {item.leader_email}
                              </Grid>
                              <Grid item xs={12}>
                                {item.leader_phone}
                              </Grid>
                            </Grid>
                          }
                          key="1"
                          style={{
                            background: '#f7f7f7',
                            borderRadius: 2,
                            marginBottom: 10,
                            border: 0,
                            // overflow: 'hidden',
                          }}
                        >
                          <Collapse defaultActiveKey="1" bordered={false}>
                            <Panel header="Members" key="4">
                              {item.members.map((rel, key) => (
                                <Grid container spacing={1}>
                                  <Grid item xs={12}>
                                    {rel.name}
                                  </Grid>
                                  <Grid item xs={12}>
                                    {rel.phone}
                                  </Grid>
                                </Grid>
                              ))}
                            </Panel>
                          </Collapse>
                        </Panel>
                      </Collapse>
                    }
                  />
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

AgencyTeams.propTypes = {
  doGetA_Teams: PropTypes.func,
  a_teams: PropTypes.node,
  name: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  a_teams: makeSelectAgencyTeams(),
  name: makeSelectAgencyName(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetA_Teams: id => dispatch(getA_Teams(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AgencyTeams);
