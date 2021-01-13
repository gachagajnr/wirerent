/**
 *
 * AgencyAdmins
 *
 */

import React, { memo, useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useParams, useHistory, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {
  Button,
  Typography,
  Tooltip,
  Layout,
  Table,
  Modal,
  Input,
  Row,
  Col,
  Divider,
} from 'antd';
import {
  PlusCircleFilled,
  ArrowLeftOutlined,
  EyeFilled,
  SearchOutlined,
} from '@ant-design/icons';
import SmsIcon from '@material-ui/icons/Sms';
import MailIcon from '@material-ui/icons/Mail';
import Paper from '@material-ui/core/Paper';
import Highlighter from 'react-highlight-words';
import GlobalHeader from 'containers/GlobalHeader/index';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { AuthContext } from 'utils/AuthContext';
import { makeSelectAgencyAdmins } from './selectors';
import { getA_Admins } from './actions';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { Header, Content } = Layout;
const { TextArea } = Input;

export function AgencyAdmins({ doGetAdmins, admins }) {
  useInjectReducer({ key: 'agencyAdmins', reducer });
  useInjectSaga({ key: 'agencyAdmins', saga });
  const { id } = useParams();
  const history = useHistory();

  const [search, setSearch] = useState({
    searchText: '',
    searchedColumn: '',
  });
  const [visible, setVisible] = useState({
    visible: false,
    to: '',
    recepient: '',
    agent: '',
    type: '',
  });
  const [text, setText] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    doGetAdmins(user.user.organization);
  }, []);

  function handleChange(e) {
    setText(e.target.value);

    e.preventDefault();
  }

  function sendText() {
    const sms = { text, visible };
    sendSMS(sms);
    setText('');
  }
  function sendMail() {
    const sms = { text, visible };
    sendEmail(sms);
    setText('');
  }

  // console.log(visible.data.to)
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
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
      title: 'User',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Tel 1',
      dataIndex: 'tel1',
      key: 'tel1',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Tooltip title="Define Admin Access" placement="top">
            <Button
              type={record.isApproved ? 'danger' : 'primary'}
              size="small"
              onClick={() => changeAdminStatus(record)}
            >
              {record.isApproved ? 'D:eny' : 'Grant'}
            </Button>
          </Tooltip>
          <Tooltip title="Send Admin Email" placement="top">
            <MailIcon
              onClick={() =>
                setVisible({
                  ...visible,
                  visible: true,
                  // data: {
                  to: record.email,
                  recepient: record.user,
                  agent: record.organization,
                  // },
                  type: 'Email',
                })
              }
            />
          </Tooltip>

          <Tooltip title="Send Admin SMS" placement="top">
            <SmsIcon
              onClick={() =>
                setVisible({
                  ...visible,
                  visible: true,
                  // data: {
                  to: record.tel1,
                  recepient: record.user,
                  agent: record.organization,
                  // },
                  type: 'SMS',
                })
              }
            />
          </Tooltip>
        </>
      ),
    },
    {
      title: ' ',
      dataIndex: ' ',
      key: 'view',
      render: (text, record) => (
        <Link to={`/admininfo/${record._id}`} key={`a-${record._id}`}>
          View Profile
        </Link>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>AgencyAdmins</title>
        <meta name="description" content="Description of AgencyAdmins" />
      </Helmet>
      <Layout>
        <GlobalHeader
          color="#77815c"
          title="Agency Admins"
          // role={user.user.role}
          other={[]}
          className="site-page-header"
          extra={[
            <Tooltip title="Invite Admin">
              <Link to="/new_a_adm">
                <Button


                  size="small"
                  icon={<PlusCircleFilled color="#fff" />}
                >
                  New Admin
                </Button>
              </Link>
            </Tooltip>,
          ]}
        />
        <Layout className="site-layout">

          <Content style={{ marginTop: 55 }}>
            <Modal
              title={visible.type}
              centered
              visible={visible.visible}
              onOk={() =>
                setVisible({
                  ...visible,
                  visible: false,
                  to: '',
                  recepient: '',
                  agent: '',
                  type: '',
                })
              }
              onCancel={() =>
                setVisible({
                  ...visible,
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
                    setVisible({
                      ...visible,
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
              <Divider orientation="left">{visible.type}</Divider>

              <TextArea
                required
                type="text"
                name="text"
                value={text}
                onChange={handleChange}
                placeholder="Type Message"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
              {visible.type === 'SMS' ? (
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div style={{ overflow: 'auto' }}>
                  <Table
                    rowKey="firstname"
                    columns={columns}
                    dataSource={admins}
                    onRow={(record, rowIndex) => ({
                      onClick: event => {}, // click row
                      onDoubleClick: event => {}, // double click row
                      onContextMenu: event => {}, // right button click row
                      onMouseEnter: event => {}, // mouse enter row
                      onMouseLeave: event => {}, // mouse leave row
                    })}
                    tableLayout="auto"
                    size="small"
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: 300 }}
                  />
                </div>
              </Grid>
            </Grid>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

AgencyAdmins.propTypes = {
  doGetAdmins: PropTypes.func,
  admins: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  admins: makeSelectAgencyAdmins(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetAdmins: id => dispatch(getA_Admins(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AgencyAdmins);
