/**
 *
 * Requests
 *
 */
import React, { memo, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, Link } from 'react-router-dom';
import {
  Button,
  Typography,
  Input,
  Layout,
  Dropdown,
  Menu,
  Table,
  Modal,
  Space,
  Tag,
  Select,
} from 'antd';
import Grid from '@material-ui/core/Grid';
import Highlighter from 'react-highlight-words';
import {
  EyeFilled,
  SearchOutlined,
  PlusCircleOutlined,
  DownOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectAgencyTeams } from 'containers/AgencyTeams/selectors';
import { getA_Teams } from 'containers/AgencyTeams/actions';
import { AuthContext } from 'utils/AuthContext';
import GlobalHeader from 'containers/GlobalHeader/index';
import app from 'utils/api';
import { makeSelectRequests } from './selectors';
import { getRequests, assignTask } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { Header, Content } = Layout;
const { Option } = Select;
const { Text } = Typography;

export function Requests({
  requests,
  doGetRequests,
  doGetTeams,
  teams,
  doAssignTask,
}) {
  useInjectReducer({ key: 'requests', reducer });
  useInjectSaga({ key: 'requests', saga });

  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [visible, setVisible] = useState({
    visible: false,
    task_id: '',
    title: '',
    team_id: '',
  });
  const [search, setSearch] = useState({
    searchText: '',
    searchedColumn: '',
  });
  const [top, setTop] = useState('none');
  const [size, setSize] = useState('small');
  const [bottom, setBottom] = useState('bottomRight');

  const id = 1;
  useEffect(() => {
    doGetRequests(user.user.organization);
    // doGetTeams(user.user.organization);
  }, []);

  app.io.on('requests created', function(event) {
    doGetRequests(user.user.organization);
  });
  app.io.on('requests patched', function(event) {
    doGetRequests(user.user.organization);
  });
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
      dataIndex: '_id',
      key: 'x',
      render: (text, record) => (
        <Link to={`/req_det/${record._id}`}>
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
    },
    {
      title: 'BD',
      dataIndex: 'building_name',
      key: 'building_name',
      width: '10%',
      ...getColumnSearchProps('building_name'),
      // sortDirections: ['descend'],
    },
    {
      title: 'Request',
      dataIndex: 'requested',
      key: 'requested',
      width: '10%',
      ...getColumnSearchProps('requested'),
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
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  onClick={() =>
                    setVisible({
                      ...visible,
                      visible: true,
                      task_id: record._id,
                      title: record.requested,
                    })
                  }
                  disabled={
                    record.isDone ||
                    record.assigned ||
                    record.completed === 'Cancelled'
                  }
                >
                  {record.assigned ? 'Assigned' : 'Assign'}
                </Menu.Item>
                <Menu.Item onClick={() => doRequestReceipt(record._id)}>
                  Complete
                </Menu.Item>
                <Menu.Item onClick={() => doRequestReceipt(record._id)}>
                  Delete
                </Menu.Item>
              </Menu>
            }
          >
            <Button icon={<DownOutlined />}>Action</Button>
          </Dropdown>
        </>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Requests</title>
        <meta name="description" content="Description of Requests" />
      </Helmet>
      <Layout>
        <GlobalHeader
          title="Services Requested"
          role={user.user.role}
          other={
            <Space>
              <Tag color="success">Total</Tag>
              <Text type="danger">DFfdfd</Text>
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
          ]}
        />
        <Layout className="site-layout">
          <Content style={{ marginTop: 55 }}>
            <Modal
              title={visible.title}
              visible={visible.visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Select
                style={{ width: 200 }}
                placeholder="Select Team"
                onChange={handleChange}
              >
                {teams.map(d => (
                  <Option key={d._id} value={d._id}>
                    {d.expertise}
                  </Option>
                ))}
              </Select>
              <Button onClick={() => doAssignTask(visible)}>Assign</Button>
            </Modal>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Table
                  tableLayout="auto"
                  rowKey="_id"
                  size={size}
                  columns={columns}
                  dataSource={requests}
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

Requests.propTypes = {
  doGetRequests: PropTypes.func,
  doAssignTask: PropTypes.func,
  doGetTeams: PropTypes.func,
  requests: PropTypes.node,
  teams: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  requests: makeSelectRequests(),
  teams: makeSelectAgencyTeams(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetRequests: organization => dispatch(getRequests(organization)),
    doGetTeams: id => dispatch(getA_Teams(id)),
    doAssignTask: task => dispatch(assignTask(task)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Requests);
