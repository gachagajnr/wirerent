import {
  ArrowLeftOutlined,
  CheckOutlined,
  DownOutlined,
  EyeFilled,
  PlusCircleOutlined,
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';

import {
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  Row,
  Col,
  Modal,InputNumber,
  PageHeader,
  Space,
  Avatar,
  Popconfirm,
  Radio,
  Select,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import React, { memo, useContext, useEffect, useState } from 'react';
import { flagRequest, getRequests } from './actions';

import { AuthContext } from 'utils/AuthContext';
import { FormattedMessage } from 'react-intl';
import GlobalHeader from 'containers/GlobalHeader/index';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import Highlighter from 'react-highlight-words';
import PropTypes from 'prop-types';
import app from 'utils/api';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAddRequests } from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const { Header, Content } = Layout;
const { Option } = Select;
const { Text } = Typography;

export function AddRequests({ doGetAddRequests, add_requests, doFlagRequest }) {
  useInjectReducer({ key: 'addRequests', reducer });
  useInjectSaga({ key: 'addRequests', saga });

  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState({
    searchText: '',
    searchedColumn: '',
  });
  let pending = 0;
  const [visible, setVisible] = useState(false);

  const [top, setTop] = useState('none');
  const [size, setSize] = useState('small');
  const [bottom, setBottom] = useState('bottomRight');
  const [page, setPage] = useState(5);

  useEffect(() => {
    doGetAddRequests(user.user.organization);
  }, []);

  if (add_requests) {
    pending = add_requests.filter(
      i =>
        (i.approved === false && i.isFlagged === false)
    ).length;
  }
  app.io.on('add-requests created', function(data) {
    doGetAddRequests(user.user.organization);
  });
  app.io.on('add-requests patched', function(data) {
    doGetAddRequests(user.user.organization);
  });

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
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
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
      title: 'Action',
      key: 'x',
      width: '10%',
      render: record => (
        <Popconfirm
          placement="right"
          disabled={record.approved || record.isFlagged}
          title="Assign Tenant To？"
          okText="New Room"
          cancelText="Existing"
          onConfirm={() => history.push(`/assign/${record._id}`)}
          onCancel={() => history.push(`/existing/${record._id}`)}
        >
          <Button
            type={record.approved || record.isFlagged ? 'text' : 'primary'}
            disabled={record.approved || record.isFlagged}
            ghost
            size="small"
          >
            {record.approved || record.isFlagged ? 'Approved' : 'Assign'}
          </Button>
        </Popconfirm>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: '10%',
      ...getColumnSearchProps('firstName'),
      // sortDirections: ['descend'],
      fixed: 'left',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
      width: '15%',
      filters: [{}],
      onFilter: (value, record) => record.surname.indexOf(value) === 0,

      ...getColumnSearchProps('surname'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'left',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Building',
      dataIndex: 'building_name',
      key: 'building_name',
      ...getColumnSearchProps('building_name'),
    },
    {
      title: 'Created On',
      dataIndex: 'createdAt',
      key: 'cat',
      ...getColumnSearchProps('createdAt'),
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    },
    {
      title: 'Action',
      key: 'operation',
      dataIndex: `approved`,
      render: (text, record) => (
        <Tooltip title="Flag Down" placement="top">
          <Button
            type={record.approved || record.isFlagged ? 'text' : 'primary'}
            size="small"
            onClick={() => doFlagRequest(record._id)}
            disabled={record.approved || record.isFlagged}
          >
            {record.isFlagged ? 'Flagged' : 'Flag'}
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>AddRequests</title>
        <meta name="description" content="Description of AddRequests" />
      </Helmet>
      <Layout>
        <GlobalHeader
          title="Tenants Add Requests"
          role={user.user.role}
          other={
            <Space>
              <Text type="danger">{pending}</Text>
              <Tag color="warning" icon={<ExclamationCircleOutlined />}>
                Needs Action
              </Tag>
            </Space>
          }
          className="site-page-header"
          extra={[
            <InputNumber
              size="small"
              min={5}
              max={100}
              defaultValue={5}
              onChange={value => setPage(value)}
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
        <Layout>
          <Content style={{ marginTop: 55 }}>
            <Table
              tableLayout="auto"
              rowKey="_id"
              size={size}
              bordered
              title={() => 'New User Requests For All Buildings'}
              columns={columns}
              dataSource={add_requests}
              pagination={{ position: [top, bottom], pageSize: page }}
              scroll={{ y: 'auto' }}
            />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

AddRequests.propTypes = {
  doGetAddRequests: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  add_requests: makeSelectAddRequests(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetAddRequests: id => dispatch(getRequests(id)),
    doFlagRequest: id => dispatch(flagRequest(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddRequests);
