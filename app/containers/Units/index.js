/**
 *
 * Units
 *
 */

import {
  ArrowLeftOutlined,
  EyeFilled,
  SearchOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Input,
  Layout,
  Modal,
  Switch,
  Row,
  Select,
  Space,
  Menu,Popover,
  Table,
  Dropdown,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import React, { memo, useContext, useEffect, useState } from 'react';

import { AuthContext } from 'utils/AuthContext';
import Can from 'utils/Can';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import Highlighter from 'react-highlight-words';
import MailIcon from '@material-ui/icons/Mail';
import PropTypes from 'prop-types';
import SmsIcon from '@material-ui/icons/Sms';
import app from 'utils/api';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getRooms } from './actions';
import GlobalHeader from 'containers/GlobalHeader/index';
import { makeSelectUnits } from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const { Header, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

export function Units({ units, doGetRooms }) {
  useInjectReducer({ key: 'units', reducer });
  useInjectSaga({ key: 'units', saga });
  const history = useHistory();

  const [search, setSearch] = useState({
    searchText: '',
    searchedColumn: '',
  });
  const [isVacant, setIsVacant] = useState(false);
  const [text, setText] = useState('');

  const [comm, setComm] = useState({
    visible: false,
    to: '',
    recepient: '',
    agent: '',
    type: '',
  });
  const [top, setTop] = useState('none');
  const [size, setSize] = useState('small');
  const [bottom, setBottom] = useState('bottomRight');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    doGetRooms(user.user.organization, isVacant);
  }, [isVacant]);

  app.io.on('rooms created', function(event) {
    doGetRooms(user.user.organization, isVacant);
  });
  app.io.on('rooms patched', function(event) {
    doGetRooms(user.user.organization, isVacant);
  });
  function handleVChange(checked) {
    setIsVacant(checked);
  }
  function handleChange(e) {
    setText(e.target.value);

    e.preventDefault();
  }
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
        <Can not do="read" on="Unit">
          <Link to={`/udas/${record._id}`} disabled={record.isVacant}>
            <EyeFilled> </EyeFilled>
          </Link>
        </Can>
      ),
    },
    {
      title: 'Identity',
      dataIndex: 'identity',
      key: 'identity',
      width: '10%',
      ...getColumnSearchProps('identity'),
      sortDirections: ['descend'],
    },
    {
      title: 'Building',
      dataIndex: 'building_name',
      key: 'building_name',
      width: '10%',
      ...getColumnSearchProps('building_name'),
    },

    {
      title: 'Rent',
      dataIndex: 'rent',
      key: 'rent',
      width: '10%',
      ...getColumnSearchProps('rent'),
    },
    {
      title: 'Quote',
      dataIndex: 'quote',
      key: 'quote',
      width: '10%',
      ...getColumnSearchProps('quote'),
    },
    {
      title: 'Features',
      dataIndex: 'features',
      key: 'features',
      // width: '20%',
      ...getColumnSearchProps('features'),
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'volcano' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toLowerCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      ...getColumnSearchProps('type'),
    },

    {
      title: 'Bills',
      dataIndex: 'bills',
      key: 'bills',
      ...getColumnSearchProps('bills'),
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toLowerCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Send User Email" placement="top">
            <MailIcon
              disabled={!record.user}
              onClick={() =>
                setComm({
                  ...comm,
                  visible: true,
                  // data: {
                  to: record.user._id,
                  recepient: record.user.email,
                  agent: record.user.agency,
                  // },
                  type: 'Email',
                })
              }
            />
          </Tooltip>

          <Tooltip title="Send User SMS" placement="top">
            <SmsIcon
              disabled={!record.user}
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
    // {
    //   title: 'Action',
    //   dataIndex: '',
    //   key: 't',
    //   render: (text, record) => (
    //     <Link to={`/a_ten/${record._id}`} disabled={record.isOccupied}>
    //       <Button size="small" type="primary" disabled={record.isOccupied}>
    //         {record.isOccupied ? null : 'Assign Tenant'}
    //       </Button>
    //     </Link>
    //   ),
    // },
  ];

  return (
    <div>
      <Helmet>
        <title>Units</title>
        <meta name="description" content="Description of Units" />
      </Helmet>
      <Layout>
        <GlobalHeader
          title="Rooms"
          role={user.user.role}
          other={
            <Space>
              <Tag color="success" icon={<CheckCircleOutlined />}>
                Total
              </Tag>
              <Text type="danger">{units.length}</Text>
            </Space>
          }
          className="site-page-header"
          extra={[
            <Switch
              checkedChildren="Vacant"
              unCheckedChildren="Occupied"
              defaultChecked={false}
              onChange={handleVChange}
            />,

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
              // style={{ top: 20 }}
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
                  // onClick={sendText}
                >
                  Send SMS
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="small"
                  style={{ margin: 5 }}
                  // onClick={sendMail}
                >
                  Send Email
                </Button>
              )}
            </Modal>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div style={{ overFlowX: 'auto' }}>
                  <Table
                    onRow={(record, rowIndex) => ({
                      onClick: event => {
                      }, // click row
                      onDoubleClick: event => {}, // double click row
                      onContextMenu: event => {}, // right button click row
                      onMouseEnter: event => {}, // mouse enter row
                      onMouseLeave: event => {}, // mouse leave row
                    })}
                    tableLayout="auto"
                    rowKey="_id"
                    size={size}
                    title={() => 'All Rooms'}
                    columns={columns}
                    dataSource={units}
                    pagination={{ position: [top, bottom] }}
                    scroll={{ y: 'auto' }}
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

Units.propTypes = {
  doGetRooms: PropTypes.func,
  units: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  units: makeSelectUnits(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetRooms: (organization, isVacant) =>
      dispatch(getRooms(organization, isVacant)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Units);
