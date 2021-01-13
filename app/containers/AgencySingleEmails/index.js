import React, { memo, useContext, useEffect,useState } from 'react';

import { AuthContext } from 'utils/AuthContext';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Table, Space, Tag, Typography, Layout,Menu,Dropdown,InputNumber ,Button} from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import GlobalHeader from 'containers/GlobalHeader/index';

import { getEmails } from './actions';
import { makeSelectAgencySingleEmails } from './selectors';
import messages from './messages';
import moment from 'moment';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

/**
 *
 * AgencySingleEmails
 *
 */
const { Content } = Layout;
const { Text } = Typography;

export function AgencySingleEmails({ doGetEmails, emails }) {
  useInjectReducer({ key: 'agencySingleEmails', reducer });
  useInjectSaga({ key: 'agencySingleEmails', saga });
  const { user } = useContext(AuthContext);
  const [top, setTop] = useState('none');
  const [size, setSize] = useState('small');
  const [page, setPage] = useState(5);

  const [bottom, setBottom] = useState('bottomRight');
  useEffect(() => {
    doGetEmails(user.user.organization);
  }, []);
 function onPageChange(value) {
   setPage(value);
 }
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: '', dataIndex: 'surname', key: 'surname' },
    { title: 'Rm', dataIndex: 'hse', key: 'hse' },
    { title: 'To', dataIndex: 'to', key: 'to' },
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
        <title>AgencySingleEmails</title>
        <meta
          name="description"
          content="Description of AgencySingleEmails"
        />
      </Helmet>
      <Layout className="site-layout">
        <GlobalHeader
          title="Agency Single Emails"
          other={
            <Space>
              <Tag color="success">Total</Tag>
              <Text type="danger">{emails.length}</Text>
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
            tableLayout="auto"
            size={size}
            columns={columns}
            dataSource={emails}
            title={() => `Single Emails To Tenants`}
            pagination={{ position: [top, bottom], pageSize: page }}
          />
        </Content>
      </Layout>
    </div>
  );
}

AgencySingleEmails.propTypes = {
  doGetEmails: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  emails: makeSelectAgencySingleEmails(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetEmails: id => dispatch(getEmails(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AgencySingleEmails);
