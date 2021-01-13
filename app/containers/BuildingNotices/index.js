/**
 *
 * BuildingNotices
 *
 */

import React, { memo, useEffect,useState } from 'react';
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
  Card,
  Row,
  Col,
  Typography,
  Layout,Space,Tag,Dropdown,
  Divider,
  List,
  Avatar,Menu,
  Comment,
  Tooltip,
} from 'antd';

import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import Paper from '@material-ui/core/Paper';
import GlobalHeader from 'containers/GlobalHeader/index';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectName,
  makeSelectBuilding,
} from 'containers/Building/selectors';
import { makeSelectBuildingNotices } from './selectors';
import { getB_Notices } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { Header, Content } = Layout;
const { Text } = Typography;
const { Meta } = Card;

export function BuildingNotices({ name, b_notices, building, doGetB_Notices }) {
  useInjectReducer({ key: 'buildingNotices', reducer });
  useInjectSaga({ key: 'buildingNotices', saga });
  const { id } = useParams();
  const history = useHistory();
  const [page, setPage] = useState(6);

  useEffect(() => {
    doGetB_Notices(id);
  }, []);

 function onPageChange(value) {
   setPage(value);
 }
  return (
    <div>
      <Helmet>
        <title>BuildingNotices</title>
        <meta name="description" content="Description of BuildingNotices" />
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
              <Text type="danger">{b_notices.length}</Text>
            </Space>,
          ]}
          className="site-page-header"
          extra={[
            <Tooltip title="Publish New Notice">
              <Link to={`/new_b_not/${id}`}>
                <Button
                  type="default"
                  size="small"
                  // icon={<PlusCircleFilled color="#fff" />}
                >
                  Publish New
                </Button>
              </Link>
            </Tooltip>,
          ]}
        />
        <Layout className="site-layout">
          <Content style={{ marginTop: 55 }}>
            <List
              grid={{ gutter: 16, column: 4 }}
              // bordered
              itemLayout="horizontal"
              dataSource={b_notices}
              renderItem={item => (
                <List.Item>
                  <Card title={item.date} extra={<h5>{name}</h5>}>
                    <Meta
                      avatar={
                        <Avatar
                          src=""
                          style={{ backgroundColor: '#001529' }}
                          size={30}
                          shape="square"
                          alt="icon"
                        >
                          {name.toUpperCase().match(/\b(\w)/g)}
                        </Avatar>
                      }
                      title="Dear Tenants"
                    />

                    <List
                      //  bordered
                       dataSource={item.rules}
                      renderItem={ite => <h5>{ite.rule}</h5>}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

BuildingNotices.propTypes = {
  doGetB_Notices: PropTypes.func,
  name: PropTypes.string,
  b_notices: PropTypes.node,
  building: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  b_notices: makeSelectBuildingNotices(),
  name: makeSelectName(),
  building: makeSelectBuilding(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetB_Notices: id => dispatch(getB_Notices(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BuildingNotices);
