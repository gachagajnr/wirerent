/**
 *
 * BuildingAdmins
 *
 */

import React, { memo, useEffect, useState, useContext } from 'react';
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
  Tooltip,
  Typography,
  Layout,
  Tag,
  Table,
  Space,
  Dropdown,
  Select,
  Menu,
} from 'antd';
import SmsIcon from '@material-ui/icons/Sms';
import MailIcon from '@material-ui/icons/Mail';
import {
  ArrowLeftOutlined,
  PlusCircleFilled,
  CheckCircleOutlined,
} from '@ant-design/icons';
import GlobalHeader from 'containers/GlobalHeader/index';
import { AuthContext } from 'utils/AuthContext';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectName } from 'containers/Building/selectors';
import { makeSelectBuildingAdmins } from './selectors';
import { getB_Admins } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { Header, Content } = Layout;
const { Text } = Typography;

export function BuildingAdmins({ doGetB_Admins, name, b_admins }) {
  useInjectReducer({ key: 'buildingAdmins', reducer });
  useInjectSaga({ key: 'buildingAdmins', saga });

  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const history = useHistory();
  const [visible, setVisible] = useState({
    visible: false,
    to: '',
    recepient: '',
    building: '',
    type: '',
  });
  const [size, setSize] = useState('small');

  useEffect(() => {
    doGetB_Admins(id);
  }, [id]);
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: text => <a href="/#">{text}</a>,
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
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
              {record.isApproved ? 'Deny' : 'Grant'}
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
                  building: record.organization,
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
                  building: record.organization,
                  // },
                  type: 'SMS',
                })
              }
            />
          </Tooltip>
        </>
      ),
    },
  ];
  return (
    <div>
      <Helmet>
        <title>BuildingAdmins</title>
        <meta name="description" content="Description of BuildingAdmins" />
      </Helmet>
      <Layout>
        <GlobalHeader
          color="#77815c"
          title={`${name} Building Admins`}
          role={user.user.role}
          other={[
            <Space>
              <Tag color="success" icon={<CheckCircleOutlined />}>
                Total
              </Tag>
              <Text type="danger">{b_admins.length}</Text>
            </Space>,
          ]}
          className="site-page-header"
          extra={[
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
            <Tooltip title="Invite Admin">
              <Link to={`/new_b_adm/${id}`}>
                <Button
                  type="primary"
                  size="small"
                  style={{ color: '#fff' }}
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
            <Table
              rowKey="_id"
              columns={columns}
              dataSource={b_admins}
              tableLayout="auto"
              size={size}
              title={() => `Admins For ${name} Building`}
              columns={columns}
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

BuildingAdmins.propTypes = {
  doGetB_Admins: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  b_admins: makeSelectBuildingAdmins(),
  name: makeSelectName(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetB_Admins: id => dispatch(getB_Admins(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BuildingAdmins);
