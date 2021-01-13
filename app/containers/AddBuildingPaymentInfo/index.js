/**
 *
 * AddBuildingPaymentInfo
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
import { Typography } from '@material-ui/core';
import { Layout } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import { Input, Form, SubmitButton, Select } from 'formik-antd';
import * as Yup from 'yup';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectName } from 'containers/Building/selectors';
import { createB_PayInfo } from 'containers/BuildingPaymentInfo/actions';
import reducer from 'containers/BuildingPaymentInfo/reducer';
import saga from 'containers/BuildingPaymentInfo/saga';
import paymentOptions from 'menus/PaymentOptions/index';
import messages from './messages';

const { Header, Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const PayInfoSchema = Yup.object().shape({
  mode: Yup.string().required('Payment Mode is Required'),
  accountNumber: Yup.number().required('Account Number is Required'),
  bank: Yup.string().required('Bank is Required'),
  accountName: Yup.string().required('Account Name is Required'),
  branch: Yup.string().required('Bank Branch is Required'),
  description: Yup.string().required('Describe the payment procedure'),
});

export function AddBuildingPaymentInfo({ name, doCreateBPayInfo }) {
  useInjectReducer({ key: 'buildingPaymentInfo', reducer });
  useInjectSaga({ key: 'buildingPaymentInfo', saga });
  const { id } = useParams();
  const history = useHistory();

  return (
    <div>
      <Helmet>
        <title>AddBuildingPaymentInfo</title>
        <meta
          name="description"
          content="Description of AddBuildingPaymentInfo"
        />
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
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <ArrowLeftOutlined
                  style={{ color: '#fff' }}
                  onClick={() => history.goBack()}
                />
                <Typography component="span" style={{ color: '#fff' }}>
                  Edit Payment Info
                </Typography>
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </Header>

          <Content style={{ marginTop: 90, padding: 30 }}>
            <Formik
              initialValues={{
                mode: '',
                accountNumber: '',
                bank: '',
                accountName: '',
                branch: '',
                description: '',
                building: id,
              }}
              validationSchema={PayInfoSchema}
              onSubmit={(values, actions) => {
                doCreateBPayInfo(values); // alert(JSON.stringify(values));
                actions.setSubmitting(false);
              }}
            >
              {({ isSubmitting, values,   touched }) => (
                <Form size="middle" type="vertical">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Form.Item
                        label="Payment Mode"
                        name="mode"
                        showValidateSuccess
                      >
                        <Select
                          name="mode"
                          placeholder="Select Payment Mode"
                          style={{ width: '100%' }}
                        >
                          {paymentOptions.menus.map(item => (
                            <Option
                              name="mode"
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

                    <Grid item xs={12} sm={6}>

                      <Form.Item
                        label="Bank Name"
                        name="bank"
                        showValidateSuccess
                      >
                        <Input
                          name="bank"
                          placeholder="Bank Name"
                          disabled={values.mode === 'Cash'}
                        />
                      </Form.Item>
                    </Grid>

                    <Grid item xs={12} sm={6}>

                      <Form.Item
                        label="Account Name"
                        name="accountName"
                        showValidateSuccess
                      >
                        <Input name="accountName" placeholder="Account Name" />
                      </Form.Item>
                    </Grid>

                    <Grid item xs={12} sm={6}>

                      <Form.Item
                        label="Account Number"
                        name="accountNumber"
                        showValidateSuccess
                      >
                        <Input
                          name="accountNumber"
                          placeholder="Account Number"
                        />
                      </Form.Item>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Bank Branch"
                        name="branch"
                        showValidateSuccess
                      >
                        <Input
                          disabled={values.mode === 'Cash'}
                          name="branch"
                          placeholder="Bank Branch"
                        />
                      </Form.Item>

                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Payment Instructions"
                        name="description"
                        showValidateSuccess
                      >
                        <TextArea
                          name="description"
                          placeholder="Payment Instructions"
                          style={{ width: '100%' }}
                          rows={6}
                        />
                      </Form.Item>

                    </Grid>
                  </Grid>
                  <SubmitButton>Save</SubmitButton>
                </Form>
              )}
            </Formik>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

AddBuildingPaymentInfo.propTypes = {
  doCreateBPayInfo: PropTypes.func,
  name: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  // addBuildingPaymentInfo: makeSelectAddBuildingPaymentInfo(),
  name: makeSelectName(),
});

function mapDispatchToProps(dispatch) {
  return {
    doCreateBPayInfo: data => dispatch(createB_PayInfo(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddBuildingPaymentInfo);
