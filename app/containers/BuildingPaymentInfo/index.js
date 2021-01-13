/**
 *
 * BuildingPaymentInfo
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useParams, useHistory, Link } from 'react-router-dom';
import { Layout, Input, Typography, Button, Space } from 'antd';
import Grid from '@material-ui/core/Grid';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectName,
  makeSelectPayment,
} from 'containers/Building/selectors';
import { getBuilding } from 'containers/Building/actions';
import reducer from 'containers/Building/reducer';
import saga from 'containers/Building/saga';
import { makeSelectBuildingPaymentInfo } from './selectors';
import messages from './messages';
const { Header, Content } = Layout;
const { TextArea } = Input;

export function BuildingPaymentInfo({ name, b_payinfo, doGetPayInfo }) {
  useInjectReducer({ key: 'buildingPaymentInfo', reducer });
  useInjectSaga({ key: 'buildingPaymentInfo', saga });
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    doGetPayInfo(id);
  }, []);
  return (
    <div>
      <Helmet>
        <title>BuildingPaymentInfo</title>
        <meta name="description" content="Description of BuildingPaymentInfo" />
      </Helmet>
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
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <ArrowLeftOutlined
                  style={{ color: '#fff' }}
                  onClick={() => history.goBack()}
                />
                <Typography component="span" style={{ color: '#fff' }}>
                  <Space>
                    {name}
                    Payment Info
                  </Space>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Link to={`/new_b_pay/${id}`}>
                  <Button type="text" style={{ color: '#fff' }}>
                    Edit
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Header>

          <Content style={{ marginTop: 90, padding: 30 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input
                  name="bank"
                  placeholder={b_payinfo.mode}
                  value={b_payinfo.mode}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Input
                  name="bank"
                  placeholder={b_payinfo.bank}
                  value={b_payinfo.bank}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Input
                  name="accountName"
                  placeholder={b_payinfo.branch}
                  value={b_payinfo.branch}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Input
                  name="accountNumber"
                  placeholder={b_payinfo.accountName}
                  value={b_payinfo.accountName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Input
                  name="branch"
                  placeholder={b_payinfo.accountName}
                  value={b_payinfo.accountName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextArea
                  name="description"
                  placeholder={b_payinfo.description}
                  value={b_payinfo.description}
                  style={{ width: '100%' }}
                  rows={6}
                />
              </Grid>
            </Grid>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

BuildingPaymentInfo.propTypes = {
  doGetPayInfo: PropTypes.func.isRequired,
  b_payinfo: PropTypes.object,
  name: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  b_payinfo: makeSelectBuildingPaymentInfo(),
  name: makeSelectName(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetPayInfo: id => dispatch(getBuilding(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BuildingPaymentInfo);
