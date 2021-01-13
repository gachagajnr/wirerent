/**
 *
 * BuildingUnits
 *
 */

import {
  ArrowLeftOutlined,
  EyeFilled,
  ExclamationCircleOutlined,
  SearchOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Divider,
  Input,
  Layout,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Menu,
  Dropdown,InputNumber,
  Typography,
} from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import React, { memo, useEffect, useState, useContext } from 'react';
import { getRooms, sendEmail, sendSms } from './actions';

import Can from 'utils/Can';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import Highlighter from 'react-highlight-words';
import MailIcon from '@material-ui/icons/Mail';
import PropTypes from 'prop-types';
import SmsIcon from '@material-ui/icons/Sms';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AuthContext } from 'utils/AuthContext';

import { makeSelectBuildingUnits } from './selectors';
import GlobalHeader from 'containers/GlobalHeader/index';

import { makeSelectName } from 'containers/Building/selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const { Header, Content } = Layout;
const { TextArea } = Input;
const { Text } = Typography;

export function BuildingUnits({
  units,
  name,
  doGetRooms,
  doSendEmail,
  doSendSms,
}) {
  useInjectReducer({ key: 'buildingUnits', reducer });
  useInjectSaga({ key: 'buildingUnits', saga });
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
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
  const [page, setPage] = useState(6);

 const [bottom, setBottom] = useState('bottomRight');
  const [isVacant, setIsVacant] = useState(false);
  useEffect(() => {
    doGetRooms(id, isVacant);
  }, [isVacant]);

  function handleChange(value) {
    setIsVacant(value);
  }
  function onPageChange(value) {
    setPage(value)
  }
  function handleVChange(e) {
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
          style={{
            width: 188,
            marginBottom: 8,
            display: 'block',
          }}
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
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
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
      fixed: 'left',
    },
    {
      title: 'Building',
      dataIndex: 'building_name',
      key: 'building_name',
      width: '10%',
      ...getColumnSearchProps('building_name'),
      fixed: 'left',
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
  ];

  return (
    <div>
      <Helmet>
        <title>BuildingUnits</title>
        <meta name="description" content="Description of BuildingUnits" />
      </Helmet>
      <Layout>
        <GlobalHeader
          color="#77815c"
          title={`${name} Units`}
          role={user.user.role}
          other={[
            <Space>
              <Tag color="success" icon={<CheckCircleOutlined />}>
                Total
              </Tag>
              <Text type="danger">{units.length}</Text>

              <Select
                defaultValue={false}
                // style={{ width: 120 }}
                onChange={handleChange}
              >
                <Select.Option value={false}>Occupied</Select.Option>
                <Select.Option value>Vacants</Select.Option>
              </Select>
            </Space>,
          ]}
          className="site-page-header"
          extra={[
            <InputNumber
              size="small"
              min={5}
              max={100}
              defaultValue={5}
              onChange={onPageChange}
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
                onChange={handleVChange}
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

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div style={{ overFlowX: 'auto' }}>
                  <Table
                    onRow={(record, rowIndex) => ({
                      onClick: event => {}, // click row
                      onDoubleClick: event => {}, // double click row
                      onContextMenu: event => {}, // right button click row
                      onMouseEnter: event => {}, // mouse enter row
                      onMouseLeave: event => {}, // mouse leave row
                    })}
                    rowKey="identity"
                    dataSource={units}
                    pagination={{ pageSize: 20 }}
                    scroll={{ y: 240 }}
                    tableLayout="auto"
                    size={size}
                    title={() => `Rooms For ${name} Building`}
                    columns={columns}
                    pagination={{ position: [top, bottom], pageSize: page }}
                    scroll={{
                      y: 'auto',
                      x: 'auto',
                      scrollToFirstRowOnChange: true,
                    }}
                    sticky
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

BuildingUnits.propTypes = {
  doGetRooms: PropTypes.func,
  units: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  units: makeSelectBuildingUnits(),
  name: makeSelectName(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetRooms: (organization, isVacant) =>
      dispatch(getRooms(organization, isVacant)),
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
)(BuildingUnits);
