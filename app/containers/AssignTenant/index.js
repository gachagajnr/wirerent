/**
 *
 * AssignTenant
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
import { Layout, Row, Col, Typography } from 'antd';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import { Input, Form, SubmitButton, Select } from 'formik-antd';
import * as Yup from 'yup';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import paymentOptions from 'menus/PaymentOptions/index';

import makeSelectAssignTenant from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { Header, Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const TenantSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Your Email is Required'),
  phone: Yup.string().required('Tel is Required'),
  paidVia: Yup.string().required('Payment Method is Required'),
  idnumber: Yup.number().required('ID Number is Required'),
});
export function AssignTenant() {
  useInjectReducer({ key: 'assignTenant', reducer });
  useInjectSaga({ key: 'assignTenant', saga });
  const history = useHistory();
  const { id } = useParams();

  return (
    <div>
      <Helmet>
        <title>AssignTenant</title>
        <meta name="description" content="Description of AssignTenant" />
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
            <Row>
              <Col span={8}>
                <ArrowLeftOutlined
                  onClick={() => history.goBack()}
                  style={{ color: '#fff' }}
                />
                <Typography component="span" style={{ color: '#fff' }}>
                  Assign Tenant Form
                </Typography>
              </Col>
            </Row>
          </Header>
          <Content style={{ marginTop: 90, padding: 10 }}>
            <Formik
              initialValues={{
                email: '',
                room: id,
                phone: '',
                notes: '',
                paidVia: '',
                idnumber: '',
              }}
              validationSchema={TenantSchema}
              onSubmit={(values, actions) => {
                assignTenant(values);
                // actions.resetForm();
              }}
            >
              {({ isSubmitting,   touched }) => (
                <Form size="middle" layout="horizontal">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Email Address"
                        name="email"
                        showValidateSuccess
                      >
                        <Input
                          name="email"
                          placeholder="User Email Address"
                          prefix={<UserOutlined />}
                        />

                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Phone Number"
                        name="phone"
                        showValidateSuccess
                      >
                        <Input
                          name="phone"
                          prefix="+254"
                          placeholder="(+2547xxxxxxxx)"
                        />

                      </Form.Item>
                    </Grid>
                    <Grid item xs={12}>
                      <Form.Item
                        label="ID Number"
                        name="idnumber"
                        showValidateSuccess
                      >
                        <Input name="idnumber" placeholder="ID Number" />

                      </Form.Item>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Paid Via"
                        name="paidVia"
                        showValidateSuccess
                      >
                        <Select
                          name="paidVia"
                          placeholder="Select Payment Mode"
                          style={{ width: '100%' }}
                        >
                          {paymentOptions.menus.map(item => (
                            <Option
                              name="type"
                              value={item.value}
                              label={item.label}
                              key={item.key}
                            >
                              <div className="demo-option-label-item">
                                {item.text}
                              </div>
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                    </Grid>

                    <Grid item xs={12}>
                      <Form.Item
                        label="Aditional Notes"
                        name="notes"
                        showValidateSuccess
                      >
                        <TextArea
                          name="notes"
                          placeholder="Additional Notes(Optional)"
                        />
                      </Form.Item>
                    </Grid>
                    <SubmitButton>Assign Room</SubmitButton>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

AssignTenant.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  assignTenant: makeSelectAssignTenant(),
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
)(AssignTenant);
