/**
 *
 * UnitTransactions
 *
 */

import {
  ArrowLeftOutlined,
  CheckCircleTwoTone,
  EyeFilled,
  LoadingOutlined,
  PlusCircleFilled,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  DatePicker,
  Drawer,
  Input,
  Layout,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import moment from 'moment'
import { Link, useHistory, useParams } from 'react-router-dom';
import React, { memo, useContext, useEffect, useState } from 'react';
import { getTransactions, uploadReceipt } from './actions';
import {
  makeSelectReceipts,
  makeSelectUnitIdentity,
} from 'containers/Unit/selectors';

import { AuthContext } from 'utils/AuthContext';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import Highlighter from 'react-highlight-words';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import app from 'utils/api';
import GlobalHeader from 'containers/GlobalHeader/index';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUnitTransactions } from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const { Header, Content } = Layout;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
export function UnitTransactions({
  receipts,
  unitIdentity,
  unitTransactions,
  doGetUTransactions,
  doUploadReceipt,
}) {
  useInjectReducer({ key: 'unitTransactions', reducer });
  useInjectSaga({ key: 'unitTransactions', saga });
  const { id } = useParams();
  const history = useHistory();

  const [record, setRecord] = useState('');
  const [upload, setUpload] = useState(false);
  const [search, setSearch] = useState({
    searchText: '',
    searchedColumn: '',
  });

  const [tran, setTran] = useState(false);
  const [value, setValue] = useState('Vacate');
  const [date, setDate] = useState('');
  const [paid, setPaid] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    doGetUTransactions(id, user.user.id);
  }, []);

  // console.log(record);
  app.io.on('receipts created', function(event) {
    doGetUTransactions(id, user.user.id);
  });
  app.io.on('receipts patched', function(event) {
    doGetUTransactions(id, user.user.id);
  });
  app.io.on('transactions created', function(event) {
    doGetUTransactions(id, user.user.id);
  });
  app.io.on('transactions patched', function(event) {
    doGetUTransactions(id, user.user.id);
  });
  function onClose() {
    setUpload(false);
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Choose Receipt Image</div>
    </div>
  );

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => setImageUrl(imageUrl));
    }
  };

  function onDateChange(e, dateString) {
    setDate(dateString);
  }
  function onAmountChange(e) {
    setPaid(e.target.value);
    e.preventDefault();
  }

  function uploadReceipt() {
    const receipt = {
      paid,
      date,
      uri: imageUrl,
      room: record._id,
    };
     doUploadReceipt(receipt);

    // setImageUrl('')
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
            handleSearch(selectedKeys, confirm, dataIndex)
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
      key: '_id',
    },
    {
      title: 'Date',
      dataIndex: 'paidOn',
      key: 'paidOn',
      width: '15%',
      render:(text,record)=>{return moment(record.paidOn).format('MMM Do YY');}
     },

    {
      title: 'Refrence No',
      dataIndex: 'refno',
      key: 'refno',
      // width: '15%',
       ...getColumnSearchProps('refno'),
      fixed: 'left',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: '15%',
      responsive: ['md'],
      ...getColumnSearchProps('amount'),
    },
    {
      title: 'Status',
      key: 'hh',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip
            title={record.isVerified ? 'Verified' : 'Not Verified'}
            placement="top"
          >
            <CheckCircleTwoTone
              style={{ fontSize: '25px' }}
              twoToneColor={record.isVerified ? 'green' : 'red'}
            />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Stat',
      dataIndex: 'hasRequestedReceipt',
      key: 'hasRequestedReceipt',
      // width: '15%',
      // ...getColumnSearchProps('depositedBy'),
      render: (text, record) => (
        <Tag color={record.hasRequestedReceipt ? 'red' : 'green'}>
          {record.hasRequestedReceipt ? 'Upload Receipt' : 'Successful'}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>UnitTransactions</title>
        <meta name="description" content="Description of UnitTransactions" />
      </Helmet>
      <Layout>
        <GlobalHeader
          color="#77815c"
          title={`${unitIdentity} Transactions`}
          // role={user.user.role}
          other={[

          ]}
          className="site-page-header"
          extra={[
            <Tooltip title="Create Transaction">
              <Link to={`/new_u_tra/${id}`}>
                <Button   size="small">
                  New Transaction
                </Button>
              </Link>
            </Tooltip>,
          ]}
        />
        <Layout className="site-layout">

          <Content style={{ marginTop: 55  }}>
            <Drawer
              title="Upload Receipt"
              placement="right"
              closable
              onClose={onClose}
              visible={upload}
              key="889"
            >
              <Space direction="vertical">
                <DatePicker
                  // defaultValue={moment('01/01/2015', 'DD/MM/YYYY')}
                  format="DD/MM/YYYY"
                  onChange={onDateChange}
                />

                <Input
                  name="amount"
                  type="number"
                  placeholder="Amount Paid"
                  onChange={onAmountChange}
                />

                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  accept="image/*"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
                <Button type="primary" onClick={uploadReceipt}>
                  Upload
                </Button>
              </Space>
            </Drawer>
            <Grid container  >
              <Grid item xs={12}>
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
                  size="small"
                  columns={columns}
                  dataSource={unitTransactions}
                  pagination={{ pageSize: 10 }}
                  scroll={{ y: 'auto' }}
                  sticky
                />
              </Grid>
            </Grid>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

UnitTransactions.propTypes = {
  doGetUTransactions: PropTypes.func,
  receipts: PropTypes.node,
  unitTransactions: PropTypes.array,
  unitIdentity: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  unitTransactions: makeSelectUnitTransactions(),
  receipts: makeSelectReceipts(),
  unitIdentity: makeSelectUnitIdentity(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetUTransactions: (id, author) => dispatch(getTransactions(id, author)),
    doUploadReceipt: data => dispatch(uploadReceipt(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UnitTransactions);
