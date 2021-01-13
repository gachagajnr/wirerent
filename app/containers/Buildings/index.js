/**
 *
 * Buildings
 *
 */

import {
  ArrowLeftOutlined,
  CheckCircleTwoTone,
  CheckOutlined,
  ExclamationCircleOutlined,
  EyeFilled,
  PlusCircleFilled,
  SearchOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Input,
  Layout,
  Dropdown,
  Menu,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import React, { memo, useContext, useEffect, useState } from 'react';

import AddLocationIcon from '@material-ui/icons/AddLocation';
// import makeSelectBuildings from './selectors';
import { AuthContext } from 'utils/AuthContext';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import Highlighter from 'react-highlight-words';
import MapIcon from '@material-ui/icons/Map';
import PropTypes from 'prop-types';
import app from 'utils/api';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getBuildings } from './actions';
import { makeSelectBuildings } from './selectors';
import messages from './messages';
import GlobalHeader from 'containers/GlobalHeader/index';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const { Header, Content } = Layout;
const { Text } = Typography;

export function Buildings({ buildings, doGetBuildings }) {
  useInjectReducer({
    key: 'buildings',
    reducer,
  });
  useInjectSaga({
    key: 'buildings',
    saga,
  });
  const history = useHistory();
  const [search, setSearch] = useState({ searchText: '', searchedColumn: '' });
  const [top, setTop] = useState('none');
  const [size, setSize] = useState('small');
  const [bottom, setBottom] = useState('bottomRight');

  const { user } = useContext(AuthContext);

  const id = 1;
  useEffect(() => {
    doGetBuildings(user.user.organization);
  }, []);

  app.io.on('buildings created', function(event) {
    doGetBuildings(user.user.organization);
  });
  app.io.on('buildings patched', function(event) {
    doGetBuildings(user.user.organization);
  });
  // app.io.on('buildings created', function(event) {
  //   doGetBuildings(user.user.organization);
  // });
  // app.io.on('buildings created', function(event) {
  //   doGetBuildings(user.user.organization);
  // });
  // app.io.on('buildings created', function(event) {
  //   doGetBuildings(user.user.organization);
  // });
  // app.io.on('buildings created', function(event) {
  //   doGetBuildings(user.user.organization);
  // });

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
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
          style={{
            width: 90,
            marginRight: 8,
          }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{
            width: 90,
          }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
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
    setSearch({
      searchText: '',
    });
  };

  const columns = [
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: record => (
        <Link to={`/x/${record._id}`}>
          <EyeFilled />
        </Link>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Floors',
      dataIndex: 'floors',
      key: 'floors',
      width: '10%',
      ...getColumnSearchProps('floors'),
    },
    {
      title: 'Units Bills',
      dataIndex: 'bills',
      key: 'bills',
      ...getColumnSearchProps('bills'),
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
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: '10%',
      ...getColumnSearchProps('location'),
    },

    {
      title: 'Miscellaneous',
      dataIndex: 'miscellaneous',
      key: 'miscellaneous',
      ...getColumnSearchProps('miscellaneous'),
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
      title: 'Verified',
      key: 'action',
      width: '15%',
      render: (text, record) => (
        <Space size="middle">
          {
            <Tooltip
              title={record.isVerified ? 'Verified' : 'Not Verified'}
              placement="right"
            >
              {record.isVerified ? (
                <CheckOutlined color="green" />
              ) : (
                <ExclamationCircleOutlined color="red" />
              )}
            </Tooltip>
          }
        </Space>
      ),
    },
    {
      title: 'Map',
      key: 'location',
      width: '10%',

      render: (text, record) => (
        <Space size="middle">
          {record.latitudes.length < 0 ||
          record.latitudes.length === undefined ? (
            <Tooltip title="View On Map" placement="right">
              <Link to={`/b_loc/${record._id}`}>
                <MapIcon
                  style={{
                    fontSize: '25px',
                  }}
                />
              </Link>
            </Tooltip>
          ) : (
            <Tooltip title="Add Location" placement="right">
              <Link to={`/add_b_loc/${record._id}`}>
                <AddLocationIcon />
              </Link>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Buildings</title>
        <meta name="description" content="Description of Buildings" />
      </Helmet>
      <Layout>
        <GlobalHeader
          title="Buildings"
          role={user.user.role}
          other={
            <Space>
              <Tag color="success" icon={<CheckCircleOutlined />}>
                Total
              </Tag>
              <Text type="danger">{buildings.length}</Text>
            </Space>
          }
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
            <Tooltip title="Create Building">
              <Link to="/new_building">
                <Button type="primary" size="small">
                  Add New Building
                </Button>
              </Link>
            </Tooltip>,
          ]}
        />
        <Layout className="site-layout">
          <Content
            style={{
              marginTop: 55,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Table
                  onRow={(record, rowIndex) => ({
                    onClick: event => {}, // click row
                    onDoubleClick: event => {}, // double click row
                    onContextMenu: event => {}, // right button click row
                    onMouseEnter: event => {}, // mouse enter row
                    onMouseLeave: event => {}, // mouse leave row
                  })}
                  columns={columns}
                  title={() => 'All Buildings'}
                  dataSource={buildings}
                  tableLayout="auto"
                  rowKey="name"
                  size={size}
                  columns={columns}
                  pagination={{ position: [top, bottom] }}
                  scroll={{ y: 'auto' }}
                />
              </Grid>
            </Grid>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

Buildings.propTypes = {
  doGetBuildings: PropTypes.func,
  buildings: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  buildings: makeSelectBuildings(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetBuildings: organization => dispatch(getBuildings(organization)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Buildings);
