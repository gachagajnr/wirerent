/**
 *
 * Tenant
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useHistory, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Divider, Col, Typography, Row, Layout } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectTenant,
  makeSelectUnitIdentity,
} from 'containers/Unit/selectors';
// import makeSelectTenant from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { Content, Header } = Layout;

const DescriptionItem = ({ title, content }) => (
  <div
    className="site-description-item-profile-wrapper"
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
    }}
  >
    <p
      className="site-description-item-profile-p"
      style={{
        marginRight: 8,
        display: 'inline-block',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

export function Tenant({ tenant, unitIdentity }) {
  useInjectReducer({ key: 'tenant', reducer });
  useInjectSaga({ key: 'tenant', saga });
  const history = useHistory();
  return (
    <div>
      <Helmet>
        <title>Tenant</title>
        <meta name="description" content="Description of Tenant" />
      </Helmet>
      <Layout>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              position: 'fixed',
              zIndex: 1,
              width: '100%',

              backgroundColor: '#001529',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <ArrowLeftOutlined
                  style={{ color: '#fff' }}
                  onClick={() => history.goBack()}
                />
                <Typography component="span" style={{ color: '#fff' }}>
                  {unitIdentity} Tenant Info
                </Typography>
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </Header>

          <Content style={{ marginTop: 90, padding: 30 }}>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Email Address" content={tenant.email} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Phone Number" content={tenant.phone} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="ID Number" content={tenant.idnumber} />
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <DescriptionItem title="Notes" content={tenant.notes} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem title="SINCE" content={tenant.createdAt} />
              </Col>
            </Row>
            <Divider />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

Tenant.propTypes = {
  tenant: PropTypes.node,
  unitIdentity: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  tenant: makeSelectTenant(),
  unitIdentity: makeSelectUnitIdentity(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Tenant);
