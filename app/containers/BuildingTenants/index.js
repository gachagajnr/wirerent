/**
 *
 * BuildingTenants
 *
 */


import {
  ArrowLeftOutlined,
  EyeFilled,ExclamationCircleOutlined ,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Divider,Menu,
  Input,
  Layout,
  Modal,
  Space,
  Table,Dropdown,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import React, { memo, useEffect, useState ,useContext} from 'react';

import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import Highlighter from 'react-highlight-words';
import MailIcon from '@material-ui/icons/Mail';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import SmsIcon from '@material-ui/icons/Sms';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import GlobalHeader from 'containers/GlobalHeader/index';
import { AuthContext } from 'utils/AuthContext';

import { makeSelectBuildingTenants } from './selectors';
import { getTenants, sendEmail, sendSms } from './actions';

import { makeSelectName } from 'containers/Building/selectors';
import messages from './messages';
import moment from 'moment';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const { Header, Content } = Layout;
const { TextArea } = Input;
const {Text}= Typography
export function BuildingTenants({
  name,
  doGetTenants,
  tenants,
  doSendEmail,
  doSendSms,
}) {
  useInjectReducer({
    key: 'buildingTenants',
    reducer,
  });
  useInjectSaga({
    key: 'buildingTenants',
    saga,
  });
  const { id } = useParams();
  const {user}= useContext(AuthContext)
  const history = useHistory();
  const [record, setRecord] = useState('');
  let duration = '';
  let total;
  const balance = 0;

  const x = moment([record.since]);
  const y = moment();

  duration = y.diff(x, 'months');
  total = duration * record.rent;
  const [search, setSearch] = useState({
    searchText: '',
    searchedColumn: '',
  });
  const [comm, setComm] = useState({
    visible: false,
    to: '',
    recepient: '',
    agent: '',
    type: '',
  });
  const [text, setText] = useState('');
  const [top, setTop] = useState('none');
  const [size, setSize] = useState('small');
  const [bottom, setBottom] = useState('bottomRight');


  useEffect(() => {
    doGetTenants(id);
  }, [id]);

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

  // console.log(info.agent.tenants)
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
      key: '_id',
      render: record => (
        <Tooltip title="View Room" placement="top">
          <Link to={`/udas/${record._id}`}>
            <EyeFilled> </EyeFilled>
          </Link>
        </Tooltip>
      ),
    },
    {
      title: 'R',
      dataIndex: 'identity',
      key: 'identity',
      // width: '20%',
      ...getColumnSearchProps('identity'),
      // sortDirections: ['descend'],
    },
    {
      title: 'Bld',
      dataIndex: 'building_name',
      key: 'building_name',
      // width: '15%',
      // ...getColumnSearchProps('floors'),
    },
    {
      title: 'ID No',
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
        <title>BuildingTenants</title>
        <meta name="description" content="Description of BuildingTenants" />
      </Helmet>

      <Layout>
        <GlobalHeader
          color="#77815c"
          title={`${name} Moving Tenants`}
          role={user.user.role}
          other={[
            <Space>
              <Text type="danger">0</Text>
              <Tag color="warning" icon={<ExclamationCircleOutlined />}>
                Need Approval
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
              centered
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
                  columns={columns}
                  dataSource={tenants}
                  size={size}
                  title={() => 'Tenants Requested Moving'}
                  pagination={{ position: [top, bottom] }}
                  scroll={{ y: 'auto', x: 'auto' }}
                />
              </Grid>
              <Grid item xs={4}>
                <Card title={record.identity} style={{ width: 300 }}>
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

BuildingTenants.propTypes = {
  doGetTenants: PropTypes.func.isRequired,
  tenants: PropTypes.array,
  name: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  tenants: makeSelectBuildingTenants(),
  name: makeSelectName(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetTenants: id => dispatch(getTenants(id)),
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
)(BuildingTenants);
