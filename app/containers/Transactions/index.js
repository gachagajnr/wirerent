/**
 *
 * Transactions
 *
 */

import {
  ArrowLeftOutlined,
  CheckCircleTwoTone,
  CheckOutlined,
  DownOutlined,
  EyeFilled,
  PlusCircleFilled,
  SearchOutlined,
  ExclamationCircleOutlined,
  WarningFilled,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  Layout,
  Menu,
  Modal,
  Popover,InputNumber,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import React, { memo, useContext, useEffect, useState } from 'react';
import { getTransactions, requestReceipt, verifyReceipt } from './actions';

import { AuthContext } from 'utils/AuthContext';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import Highlighter from 'react-highlight-words';

import PropTypes from 'prop-types';
import app from 'utils/api';
import GlobalHeader from 'containers/GlobalHeader/index';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectTransactions } from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const { Header, Content } = Layout;
const { Option } = Select;
const { Text } = Typography;

export function Transactions({
  transactions,
  doGetTransactions,
  doVerifyReceipt,
  doRequestReceipt,
}) {
  useInjectReducer({ key: 'transactions', reducer });
  useInjectSaga({ key: 'transactions', saga });
  const history = useHistory();
  const [ref, setRef] = useState('');
  const [date, setDate] = useState(1);
  const [record, setRecord] = useState('');
  const [view, setView] = useState(false);
  const [time, setTime] = useState(0);
  const [top, setTop] = useState('none');
  const [size, setSize] = useState('small');
  const [bottom, setBottom] = useState('bottomRight');
 const [page, setPage] = useState(5);

  const [search, setSearch] = useState({ searchText: '', searchedColumn: '' });
  const id = 1;
  let pending,
    receiptsrequested = 0;

  const { user } = useContext(AuthContext);
  useEffect(() => {
    doGetTransactions(user.user.organization, time);
  }, [time]);

  if (transactions) {
    pending = transactions.filter(
      i => i.isVerified === false || i.hasRequestedReceipt === true,
    ).length;
    receiptsrequested =  transactions.filter(
      i => i.hasRequestedReceipt === true,
    ).length;
  }
  app.io.on('receipts created', function(event) {
    doGetTransactions(user.user.organization);
  });
  app.io.on('receipts patched', function(event) {
    doGetTransactions(user.user.organization);
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

  function handleChange(value) {
    setTime(value);
  }
  console.log(time);

  const columns = [
    {
      title: 'Room',
      dataIndex: 'roomName',
      key: 'roomName',
      width: '15%',
      ...getColumnSearchProps('roomName'),
      sortDirections: ['descend'],
    },
    {
      title: 'Building',
      dataIndex: 'buildingName',
      key: 'buildingName',
      // width: '10%',
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
      width: '15%',
      ...getColumnSearchProps('amount'),
    },
    {
      title: 'Depositer',
      dataIndex: 'depositedBy',
      key: 'depositedBy',
      width: '20%',
      ...getColumnSearchProps('depositedBy'),
    },

    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <Space size="small" direction="horizontal">
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
            disabled={record.isVerified}
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
                  onClick={() => doVerifyReceipt(record._id)}
                >
                  Verify
                </Button>
              </Space>
            }
            title={record.refno}
            trigger="hover"
          >
            <Button
              disabled={record.isVerified}
              type="primary"
              size="small"
              ghost
            >
              Verify
            </Button>
          </Popover>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Transactions</title>
        <meta name="description" content="Description of Transactions" />
      </Helmet>
      <Layout>
        <GlobalHeader
          title="Transactions"
          role={user.user.role}
          other={[
            <Space>
              <Text type="danger">{pending}</Text>
              <Tag color="warning" icon={<ExclamationCircleOutlined />}>
                Needs Action
              </Tag>
            </Space>,
            <Space>
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
        <Layout className="site-layout">
          <Content style={{ marginTop: 55 }}>
            <Modal
              title="Basic Modal"
              visible={view}
              onOk={() => setView(false)}
              onCancel={() => setView(false)}
            >
              <img
                alt="receipt"
                src={`http://localhost:3030/uploads/${record.receiptName}`}
              />
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
                    },
                    // click row
                    onDoubleClick: event => {}, // double click row
                    onContextMenu: event => {}, // right button click row
                    onMouseEnter: event => {}, // mouse enter row
                    onMouseLeave: event => {}, // mouse leave row
                  })}
                  tableLayout="auto"
                  rowKey="_id"
                  size={size}
                  title={() => 'Tenants Receipts For All Buildings'}
                  columns={columns}
                  dataSource={transactions}
                  pagination={{ position: [top, bottom], pageSize: page }}
                  scroll={{ y: 'auto' }}
                />
              </Grid>
              <Grid item xs={4}>
                <Card
                  title={record.roomName}
                  bordered={true}
                  style={{ width: 300 }}
                >
                  <p>
                    {record.hasRequestedReceipt ? (
                      <Tag color="red"> Receipt Requested</Tag>
                    ) : (
                      ''
                    )}
                  </p>
                  <p>{record.buildingName}</p>
                  <p>{record.refno}</p>
                  <p>{record.approved}</p>
                  <p>{record.amount}</p>
                  <p>{record.depositedAt}</p>
                  <p>{record.depositedBy}</p>
                  <p>{record.paidOn}</p>
                  {record.receipt ? (
                    <Button size="small" onClick={() => setView(true)}>
                      View Receipt
                    </Button>
                  ) : null}

                  <Button
                    size="small"
                    type="primary"
                    disabled={
                      record.isVerified ||
                      !record ||
                      record.hasRequestedReceipt ||
                      record.receipt
                    }
                    onClick={() => doRequestReceipt(record._id)}
                  >
                    Request Receipt
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

Transactions.propTypes = {
  doGetTransactions: PropTypes.func,
  doVerifyReceipt: PropTypes.func,
  doRequestReceipt: PropTypes.func,
  transactions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectTransactions(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetTransactions: (organization, time) =>
      dispatch(getTransactions(organization, time)),
    doVerifyReceipt: id => dispatch(verifyReceipt(id)),
    doRequestReceipt: id => dispatch(requestReceipt(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Transactions);
