/**
 *
 * BuildingRequests
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useParams, useHistory, Link } from 'react-router-dom';
import {
  Button,
  Tooltip,
  Typography,
  Input,
  Layout,InputNumber,
  Table,
  Modal,Menu,
  Select,Tag,Space,Dropdown
} from 'antd';
import Grid from '@material-ui/core/Grid';
import Highlighter from 'react-highlight-words';
import {
  EyeFilled,
  SearchOutlined,
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import GlobalHeader from 'containers/GlobalHeader/index';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectName, makeSelectTeams } from 'containers/Building/selectors';

import Can from 'utils/Can';
import { makeSelectBuildingRequests } from './selectors';
import { getB_Requests } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { Header, Content } = Layout;
const { Option } = Select;
const { Text } = Typography;

export function BuildingRequests({ doGetB_Requests, teams, b_requests, name }) {
  useInjectReducer({ key: 'buildingRequests', reducer });
  useInjectSaga({ key: 'buildingRequests', saga });

  const { id } = useParams();
  const history = useHistory();
  const [visible, setVisible] = useState({
    visible: false,
    task_id: '',
    title: '',
    team_id: '',
  });
  const [search, setSearch] = useState({ searchText: '', searchedColumn: '' });
  const [size, setSize] = useState('small');
const [top, setTop] = useState('none');
 const [page, setPage] = useState(6);

const [bottom, setBottom] = useState('bottomRight');

  useEffect(() => {
    doGetB_Requests(id);
  }, []);

  function handleCancel() {
    setVisible({
      ...visible,
      visible: false,
      task_id: '',
      title: '',
      team_id: '',
    });
  }

  function handleOk() {
    setVisible({
      ...visible,
      visible: false,
      task_id: '',
      title: '',
      team_id: '',
    });
  }

  function handleChange(value) {
    setVisible({ ...visible, team_id: value });
  }
   function onPageChange(value) {
     setPage(value);
   }
  //  console.log( visible);

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
        <Link to={`/requestinfo/${record._id}`}>
          <EyeFilled> </EyeFilled>
        </Link>
      ),
    },
    {
      title: 'Identity',
      dataIndex: 'identity',
      key: 'identity',
      width: '10%',
      ...getColumnSearchProps('identity'),
      // sortDirections: ['descend'],
      fixed:'left',

    },
    {
      title: 'Request',
      dataIndex: 'requested',
      key: 'requested',
      // width: '15%',
      ...getColumnSearchProps('requested'),
      fixed:'left'
    },
    {
      title: 'Descripion',
      dataIndex: 'description',
      key: 'description',
      align: 'left',
      // width: '10%',
      ...getColumnSearchProps('description'),
    },
    {
      title: 'Created On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      // width: '20%',
      ...getColumnSearchProps('createdAt'),
    },

    {
      title: 'Status',
      dataIndex: 'completed',
      key: 'completed',
      className: Boolean,
      ...getColumnSearchProps('completed'),
    },
    {
      title: 'Action',
      key: 'operation',
      render: (text, record) => (
        <>
          <Can do="read" on="AdminMenu" field="admin">
            <Button
              type={record.assigned ? 'danger' : 'primary'}
              disabled={
                record.assigned ||
                record.completed === 'Cancelled' ||
                record.completed === 'Approved'
              }
              size="small"
              // e({visible:false,task_id:'', title:'', value:''});
              //
              onClick={() =>
                setVisible({
                  ...visible,
                  visible: true,
                  task_id: record._id,
                  title: record.requested,
                })
              }
            >
              {record.assigned ? 'Assigned' : 'Assign'}
            </Button>
          </Can>
        </>
      ),
    },
  ];
  return (
    <div>
      <Helmet>
        <title>BuildingRequests</title>
        <meta name="description" content="Description of BuildingRequests" />
      </Helmet>
      <Layout>
        <GlobalHeader
          color="#77815c"
          title={`${name} Building Requests`}
          // role={user.user.role}
          other={[
            <Space>
              <Tag color="warning" icon={<ExclamationCircleOutlined />}>
                Total
              </Tag>
              <Text type="danger">{b_requests.length}</Text>
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
                      Default
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
              rowKey="identity"
              expandable={{
                expandedRowRender: record => (
                  <p style={{ marginLeft: 10, color: 'red' }}>{`${
                    record.description
                  } on ${record.date} because ${record.cancelReason}`}</p>
                ),
                rowExpandable: record => record.identity !== 'Not Expandable',
              }}
              dataSource={b_requests}
              size={size}
              title={() => `Tenants Requests For ${name} Building`}
              columns={columns}
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

BuildingRequests.propTypes = {
  doGetB_Requests: PropTypes.func,
  name: PropTypes.string,
  teams: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  b_requests: makeSelectBuildingRequests(),
  name: makeSelectName(),
  teams: makeSelectTeams(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetB_Requests: id => dispatch(getB_Requests(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BuildingRequests);
