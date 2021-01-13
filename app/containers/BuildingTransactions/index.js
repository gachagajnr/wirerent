/**
 *
 * BuildingTransactions
 *
 */

import React, { memo, useEffect,useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {
  Button,
  Space,
  Input,
  Popover,
  Table,
  Layout,
  Menu,Tag,
  Typography,
  Tooltip,InputNumber ,
  Dropdown,
} from 'antd';
import {
  SearchOutlined,
  EyeFilled,
  ArrowLeftOutlined,
  CheckOutlined,
  WarningFilled,
  PlusCircleFilled,
  CheckCircleTwoTone,
  DownOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import Paper from '@material-ui/core/Paper';
import Highlighter from 'react-highlight-words';
import GlobalHeader from 'containers/GlobalHeader/index';
import { AuthContext } from 'utils/AuthContext';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectName } from 'containers/Building/selectors';
import { getTransactions } from './actions';
import { makeSelectBuildingTransactions } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { Header, Content } = Layout;
const { Text } = Typography;


export function BuildingTransactions({
  transactions,
  name,
  doGetTransactions,
}) {
  useInjectReducer({ key: 'buildingTransactions', reducer });
  useInjectSaga({ key: 'buildingTransactions', saga });
  const{user}= useContext(AuthContext)
  const { id } = useParams();
  const history = useHistory();
  const [ref, setRef] = useState('');
  const [search, setSearch] = useState({
    searchText: '',
    searchedColumn: '',
  });
  const [top, setTop] = useState('none');
  const [size, setSize] = useState('small');
  const [page, setPage] = useState(6);

  const [bottom, setBottom] = useState('bottomRight');
  let pending,
    receiptsrequested = 0;

  useEffect(() => {
    doGetTransactions(id);
  }, []);

  if (transactions) {
    pending = transactions.filter(
      i => i.isVerified === false || i.hasRequestedReceipt === true,
    ).length;
    receiptsrequested = transactions.filter(
      i => i.hasRequestedReceipt === true,
    ).length;
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

  function onChange(e) {
    setRef(e.target.value);
  }
  function onPageChange(value) {
    setPage(value)
  }

  const columns = [
    {
      title: '',
      dataIndex: '_id',
      key: '_id',
      render: record => (
        <Link to={`/buildinginfo/${record._id}`}>
          <EyeFilled> </EyeFilled>
        </Link>
      ),
    },
    {
      title: 'Room',
      dataIndex: 'roomName',
      key: 'roomName',
      width: '10%',
      ...getColumnSearchProps('roomName'),
      sortDirections: ['descend'],
      fixed:'left'
    },
    {
      title: 'Building',
      dataIndex: 'buildingName',
      key: 'buildingName',
      width: '10%',
      ...getColumnSearchProps('buildingName'),
      sortDirections: ['descend'],
    },
    {
      title: 'Ref No',
      dataIndex: 'refno',
      key: 'refno',
      // width: '15%',
      ...getColumnSearchProps('refno'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: '10%',
      ...getColumnSearchProps('amount'),
    },
    {
      title: 'By',
      dataIndex: 'depositedBy',
      key: 'depositedBy',
      // width: '20%',
      ...getColumnSearchProps('depositedBy'),
    },
    {
      title: 'On',
      dataIndex: 'paidOn',
      key: 'paidOn',
      // width: '20%',
      ...getColumnSearchProps('paidOn'),
    },

    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {
            <Tooltip
              title={record.isVerified ? 'Verified' : 'Not Verified'}
              placement="top"
            >
              <CheckCircleTwoTone
                style={{ fontSize: '25px' }}
                twoToneColor={record.isVerified ? 'green' : 'red'}
              />
            </Tooltip>
          }
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',

      render: (record, text) => (
        <span className="table-operation">
          <Popover
            placement="left"
            content={
              <Space>
                <Input
                  onChange={onChange}
                  placeholder="Enter Ref No"
                  addonAfter={
                    record.refno === ref ? (
                      <CheckOutlined style={{ color: 'green' }} />
                    ) : (
                      <WarningFilled style={{ color: 'red' }} />
                    )
                  }
                  allowClear
                />
                <Button
                  type="primary"
                  disabled={record.refno !== ref || record.isVerified}
                  onClick={() => verifyReceipt(record._id)}
                >
                  Verify
                </Button>
              </Space>
            }
            title={record.refno}
            trigger="hover"
          >
            <Button type="text" size="small">
              Hover
            </Button>
          </Popover>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => requestReceipt(record._id)}>
                  Request Receipt
                </Menu.Item>
              </Menu>
            }
          >
            <Button icon={<DownOutlined />}>More</Button>
          </Dropdown>
        </span>
      ),
    },
  ];
  return (
    <div>
      <Helmet>
        <title>BuildingTransactions</title>
        <meta
          name="description"
          content="Description of BuildingTransactions"
        />
      </Helmet>
      <Layout>
        <GlobalHeader
          color="#77815c"
          title={`${name} Transactions`}
          role={user.user.role}
          other={[
            <Space>
              <Text type="danger">{pending}</Text>
              <Tag color="warning" icon={<ExclamationCircleOutlined />}>
                Needs Action
              </Tag>

              <Text type="danger">{receiptsrequested}</Text>
              <Tag color="warning" icon={<ExclamationCircleOutlined />}>
                Requested Receipt
              </Tag>
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
            <Table

              tableLayout="auto"
              rowKey="_id"
              size={size}
              title={() => `Tenants Receipts For ${name} Building`}
              columns={columns}
              dataSource={transactions}
              pagination={{ position: [top, bottom], pageSize: page }}
              scroll={{
                y: 'auto',
                x: 'auto',
                scrollToFirstRowOnChange: true,
              }}
              sticky
            />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

BuildingTransactions.propTypes = {
  doGetTransactions: PropTypes.func,
  transactions: PropTypes.array,
  name: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectBuildingTransactions(),
  name: makeSelectName(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetTransactions: id => dispatch(getTransactions(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BuildingTransactions);
