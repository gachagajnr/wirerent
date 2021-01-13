/**
 *
 * Tenants
 *
 */

import {
  ArrowLeftOutlined,
  EyeFilled,
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Divider,
  Dropdown,
  Menu,
  Input,
  Layout,
  Modal,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import React, { memo, useContext, useEffect, useState } from 'react';
import { getTenants, sendEmail, sendSms } from './actions';

import { AuthContext } from 'utils/AuthContext';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import Highlighter from 'react-highlight-words';
import MailIcon from '@material-ui/icons/Mail';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import SmsIcon from '@material-ui/icons/Sms';
import app from 'utils/api';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectTenants } from './selectors';
import messages from './messages';
import moment from 'moment';
import reducer from './reducer';
import GlobalHeader from 'containers/GlobalHeader/index';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const { Header, Content } = Layout;
const { TextArea } = Input;
const { Text } = Typography;

export function Tenants({ tenants, doGetTenants, doSendSms, doSendEmail }) {
  useInjectReducer({
    key: 'tenants',
    reducer,
  });
  useInjectSaga({
    key: 'tenants',
    saga,
  });

  // let { id } = useParams();
  const history = useHistory();
  const [search, setSearch] = useState({
    searchText: '',
    searchedColumn: '',
  });
  const [record, setRecord] = useState('');
  const [top, setTop] = useState('none');
  const [size, setSize] = useState('small');
  const [bottom, setBottom] = useState('bottomRight');

  let duration = '';
  let total;
  const balance = 0;

  const x = moment([record.since]);
  const y = moment();

  duration = y.diff(x, 'months');
  total = duration * record.rent;
  const [comm, setComm] = useState({
    visible: false,
    to: '',
    recepient: '',
    agent: '',
    type: '',
  });
  const [text, setText] = useState('');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    doGetTenants(user.user.organization);
  }, []);
  app.io.on('rooms patched', function(event) {
    doGetTenants(user.user.organization);
  });
  function handleChange(e) {
    setText(e.target.value);

    e.preventDefault();
  }

  function sendText() {
    const sms = { text, comm };
    doSendSms(sms);
    setText('');
  }
  function sendMail() {
    const sms = { text, comm };
    doSendEmail(sms);
    setText('');
  }

  // console.log(record.receipts);
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={node => {
          //  searchInput = node;
          // }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(4);
      }
    },
    render: text =>
      search.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[search.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearch({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearch({ searchText: '' });
  };

  const columns = [
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: record => (
        <Tooltip title="View Room" placement="top">
          <Link to={`/udas/${record._id}`}>
            <EyeFilled> </EyeFilled>
          </Link>
        </Tooltip>
      ),
    },
    {
      title: 'Room',
      dataIndex: 'identity',
      key: 'identity',
      // width: '20%',
      ...getColumnSearchProps('identity'),
      // sortDirections: ['descend'],
    },
    {
      title: 'Building Name',
      dataIndex: 'building_name',
      key: 'building_name',
      // width: '15%',
      // ...getColumnSearchProps('floors'),
    },
    {
      title: 'ID',
      dataIndex: 'idnumber',
      key: 'idnumber',
      // width: '15%',
      // ...getColumnSearchProps('floors'),
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      // width: '10%',
      // ...getColumnSearchProps('total'),
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Send User Email" placement="top">
            <MailIcon
              onClick={() =>
                setComm({
                  ...comm,
                  visible: true,
                  // data: {
                  to: record.user.email,
                  recepient: record.user._id,
                  agent: record.user.agency,
                  // },
                  type: 'Email',
                })
              }
            />
          </Tooltip>

          <Tooltip title="Send User SMS" placement="top">
            <SmsIcon
              onClick={() =>
                setComm({
                  ...comm,
                  visible: true,
                  // data: {
                  to: record.user.phone,
                  recepient: record.user._id,
                  agent: record.user.agency,
                  // },
                  type: 'SMS',
                })
              }
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Tenants</title>
        <meta name="description" content="Description of Tenants" />
      </Helmet>
      <Layout>
        <GlobalHeader
          title="Moving Tenants"
          role={user.user.role}
          other={[
            <Space>
              <Text type="danger">fdfdfdf</Text>
              <Tag color="warning" icon={<ExclamationCircleOutlined />}>
                Needs Action
              </Tag>
            </Space>,
          ]}
          className="site-page-header"
          extra={[
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
            <Modal
              style={{ top: 20 }}
              visible={comm.visible}
              onOk={() =>
                setComm({
                  ...comm,
                  visible: false,
                  to: '',
                  recepient: '',
                  agent: '',
                  type: '',
                })
              }
              onCancel={() =>
                setComm({
                  ...comm,
                  visible: false,
                  to: '',
                  recepient: '',
                  agent: '',
                  type: '',
                })
              }
              footer={[
                <Button
                  key="back"
                  onClick={() =>
                    setComm({
                      ...comm,
                      visible: false,
                      to: '',
                      recepient: '',
                      agent: '',
                      type: '',
                    })
                  }
                >
                  Cancel
                </Button>,
              ]}
            >
              <Divider orientation="left">{comm.type}</Divider>

              <TextArea
                required
                type="text"
                name="text"
                value={text}
                onChange={handleChange}
                placeholder="Type Message"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
              {comm.type === 'SMS' ? (
                <Button
                  type="primary"
                  size="small"
                  style={{ margin: 5 }}
                  onClick={sendText}
                >
                  Send SMS
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="small"
                  style={{ margin: 5 }}
                  onClick={sendMail}
                >
                  Send Email
                </Button>
              )}
            </Modal>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={8}>
                <div style={{ overFlowX: 'auto' }}>
                  <Table
                    onRow={(record, rowIndex) => ({
                      onClick: event => {
                        setRecord(record);
                      }, // click row
                      onDoubleClick: event => {}, // double click row
                      onContextMenu: event => {}, // right button click row
                      onMouseEnter: event => {}, // mouse enter row
                      onMouseLeave: event => {}, // mouse leave row
                    })}
                    tableLayout="auto"
                    rowKey="email"
                    size={size}
                    title={() => 'Tenants Requested Moving'}
                    columns={columns}
                    dataSource={tenants}
                    pagination={{ position: [top, bottom] }}
                    scroll={{ y: 'auto' }}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <Card title={record.identity} style={{width:300}}>
                  <p>{record.building_name}</p>
                  <p>{record.floor}</p>

                  <p>{record.idnumber}</p>
                  <p>{record.rent}</p>
                  {record.since ? (
                    <p>
                      For: <Tag color="red">{duration}</Tag> Months
                    </p>
                  ) : null}
                  <p>{total}</p>
                  <p>{balance}</p>
                </Card>
              </Grid>
            </Grid>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

Tenants.propTypes = {
  doGetTenants: PropTypes.func,
  tenants: PropTypes.node,
  doSendSms: PropTypes.func,
  doSendEmail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  tenants: makeSelectTenants(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetTenants: organization => dispatch(getTenants(organization)),
    doSendEmail: data => dispatch(sendEmail(data)),
    doSendSms: data => dispatch(sendSms(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Tenants);
