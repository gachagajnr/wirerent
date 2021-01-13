/**
 *
 * Agencies
 *
 */

import React, { memo, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import {
  Layout,
  Typography,
  Table,
  Button,
  Input,
  Row,
  Col,
  Tooltip,
} from 'antd';
import {
  SearchOutlined,
  PlusCircleFilled,
  EyeFilled,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { AuthContext } from 'utils/AuthContext';
import { getAgencies } from './actions';
import makeSelectAgencies from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { Header, Content } = Layout;

export function Agencies({ agencies, doAgencies }) {
  const { user } = useContext(AuthContext);
  useInjectReducer({ key: 'agencies', reducer });
  useInjectSaga({ key: 'agencies', saga });
  const history = useHistory();

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    doAgencies();
  }, []);

  const columns = [
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: record => (
        <Link to={`/agent/${record._id}`}>
          <EyeFilled> </EyeFilled>
        </Link>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',

      // ...getColumnSearchProps('name'),
      sortDirections: ['descend'],
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',

      // ...getColumnSearchProps('phone'),
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',

      // ...getColumnSearchProps('email'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '10%',

      // ...getColumnSearchProps('address'),
    },
    {
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
      width: '10%',

      // ...getColumnSearchProps('street'),
    },

    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      width: '10%',

      // ...getColumnSearchProps('city'),
    },
  ];
  return (
    <div>
      <Helmet>
        <title>Agencies</title>
        <meta name="description" content="Description of Agencies" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <Layout>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              position: 'fixed',
              zIndex: 1,
              width: '100%',
              marginTop: 10,
              backgroundColor: '#001529',
            }}
          >
            <Row>
              <Col span={8}>
                <ArrowLeftOutlined
                  style={{ color: '#fff' }}
                  onClick={() => history.goBack()}
                />
                <Typography component="span" style={{ color: '#fff' }}>
                  Agencies
                </Typography>
              </Col>
              <Col span={8} offset={8}>
                <Tooltip title="Create Agency">
                  <Link to="/new_age">
                    <Button
                      type="default"
                      size="small"
                      icon={<PlusCircleFilled color="#fff" />}
                    >
                      New Agency
                    </Button>
                  </Link>
                </Tooltip>
              </Col>
            </Row>
          </Header>
          <Content style={{ marginTop: 90 }}>
            <div style={{ overflowX: 'auto' }}>
              <Table
                onRow={(record, rowIndex) => ({
                  onClick: event => {}, // click row
                  onDoubleClick: event => {}, // double click row
                  onContextMenu: event => {}, // right button click row
                  onMouseEnter: event => {}, // mouse enter row
                  onMouseLeave: event => {}, // mouse leave row
                })}
                tableLayout="auto"
                rowKey="name"
                size="small"
                columns={columns}
                dataSource={agencies}
                pagination={{ pageSize: 20 }}
                scroll={{ y: 240 }}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

Agencies.propTypes = {
  agencies: PropTypes.array,
  doAgencies: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  agencies: makeSelectAgencies(),
});

function mapDispatchToProps(dispatch) {
  return {
    doAgencies: () => dispatch(getAgencies()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Agencies);
