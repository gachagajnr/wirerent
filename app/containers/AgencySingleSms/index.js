/**
 *
 * AgencySingleSms
 *
 */

import React, { memo, useContext,useState, useEffect } from 'react';

import { AuthContext } from 'utils/AuthContext';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import {
  Table,
  Space,
  Tag,
  Typography,
  Layout,
  Menu,
  Dropdown,
  InputNumber,
  Button,
} from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import GlobalHeader from 'containers/GlobalHeader/index';

import { getSms } from './actions';
import { makeSelectAgencySingleSms } from './selectors';
import messages from './messages';
import moment from 'moment';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
const { Content } = Layout;
const { Text } = Typography;

export function AgencySingleSms({ doGetSms, sms }) {
  useInjectReducer({ key: 'agencySingleSms', reducer });
  useInjectSaga({ key: 'agencySingleSms', saga });

  const { user } = useContext(AuthContext);
 const [top, setTop] = useState('none');
 const [size, setSize] = useState('small');
 const [page, setPage] = useState(5);

 const [bottom, setBottom] = useState('bottomRight');
  useEffect(() => {
    doGetSms(user.user.organization);
  }, []);

   function onPageChange(value) {
     setPage(value);
   }
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: '', dataIndex: 'surname', key: 'surname' },
    { title: 'Room', dataIndex: 'hse', key: 'hse' },

    { title: 'Phone', dataIndex: 'to', key: 'to' },
    { title: 'Text', dataIndex: 'text', key: 'text' },
    {
      title: 'Date',
      dataIndex: '',
      key: 'x',
      render: record => <a>{moment(record.createdAt).format('MMM Do YY')}</a>,
    },
  ];
  return (
    <div>
      <Helmet>
        <title>AgencySingleSms</title>
        <meta name="description" content="Description of AgencySingleSms" />
      </Helmet>
      <Layout className="site-layout">
        <GlobalHeader
          title="Agency Single Smses"
          other={
            <Space>
              <Tag color="success">Total</Tag>
              <Text type="danger">{sms.length}</Text>
            </Space>
          }
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
        <Content style={{ marginTop: 55 }}>
          <Table

            columns={columns}
            dataSource={sms}
            tableLayout="auto"
            size={size}

            title={() => `Single Smses To Tenants`}
            pagination={{ position: [top, bottom], pageSize: page }}
          />
        </Content>
      </Layout>
    </div>
  );
}

AgencySingleSms.propTypes = {
  doGetSms: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sms: makeSelectAgencySingleSms(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetSms: id => dispatch(getSms(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AgencySingleSms);
