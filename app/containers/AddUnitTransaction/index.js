/**
 *
 * AddUnitTransaction
 *
 */

import * as Yup from 'yup';

import { DatePicker, Form, Input, SubmitButton } from 'formik-antd';
import { Layout, Typography } from 'antd';
import React, { memo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createTransaction } from 'containers/UnitTransactions/actions';
import makeSelectAddUnitTransaction from './selectors';
import { makeSelectUnitIdentity } from 'containers/Unit/selectors';
import messages from './messages';
import reducer from 'containers/UnitTransactions/reducer';
import saga from 'containers/UnitTransactions/saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const { Header, Content } = Layout;

const ReceiptSchema = Yup.object().shape({
  status: Yup.string().required('Receipt Status is Required'),
  depositedBy: Yup.string().required('Name/Depositer is Required'),
  paidOn: Yup.string().required('Paying Date is Required'),
  depositedAt: Yup.string().required('Deposit Branch is Required'),
  amount: Yup.string().required('Amount is Required'),
  bankrefno: Yup.string().required(' Receipt Reference No is Required'),
});

export function AddUnitTransaction({ doCreateTransaction, identity }) {
  useInjectReducer({ key: 'unitTransactions', reducer });
  useInjectSaga({ key: 'unitTransactions', saga });

  const history = useHistory();
  const { id } = useParams();

  return (
    <div>
      <Helmet>
        <title>AddUnitTransaction</title>
        <meta name="description" content="Description of AddUnitTransaction" />
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
                  {`${identity} `} Record Transaction
                </Typography>
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </Header>

          <Content style={{ marginTop: 90, padding: 30 }}>
            <Formik
              initialValues={{
                // value: value,
                status: '',
                depositedBy: '',
                room: id,
                depositedAt: '',
                paidOn: '',
                amount: '',
                bankrefno: '',
              }}
              validationSchema={ReceiptSchema}
              onSubmit={(values, actions) => {
                doCreateTransaction(values);
                actions.setSubmitting(false);
                actions.resetForm();

                // alert(JSON.stringify(values));
              }}
            >
              {({ isSubmitting,  touched }) => (
                <Form layout="vertical">
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Receipt Status"
                        name="status"
                        showValidateSuccess
                        style={{ marginTop: 16 }}
                      >
                        <Input name="status" placeholder="APPROVED" />

                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Agent Name/Bank Branch"
                        name="depositedAt"
                        showValidateSuccess
                        style={{ marginTop: 16 }}
                      >
                        <Input
                          name="depositedAt"
                          placeholder="Agent Name/Bank Branch"
                        />

                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Bank Ref NO"
                        name="bankrefno"
                        showValidateSuccess
                        style={{ marginTop: 16 }}
                      >
                        <Input name="bankrefno" placeholder="Bank Ref NO" />

                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Amount"
                        name="amount"
                        showValidateSuccess
                        style={{ marginTop: 16 }}
                      >
                        <Input
                          name="amount"
                          placeholder="Amount Paid"
                          autoSize={{ minRows: 3, maxRows: 5 }}
                        />

                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Deposited By"
                        name="depositedBy"
                        showValidateSuccess
                        style={{ marginTop: 16 }}
                      >
                        <Input
                          name="depositedBy"
                          placeholder="Deposited By"
                          autoSize={{ minRows: 3, maxRows: 5 }}
                        />

                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Paid On"
                        name="paidOn"
                        showValidateSuccess
                        style={{ marginTop: 16 }}
                      >
                        <DatePicker
                          name="paidOn"
                          style={{ color: 'red' }}
                          dateRender={current => {
                            const style = {};
                            if (current.date() === 1) {
                              style.border = '1px solid #1890ff';
                              style.borderRadius = '50%';
                            }
                            return (
                              <div
                                className="ant-picker-cell-inner"
                                style={style}
                              >
                                {current.date()}
                              </div>
                            );
                          }}
                          placeholder="Paid On"
                        />

                      </Form.Item>
                    </Grid>
                  </Grid>
                  <SubmitButton>Submit</SubmitButton>
                </Form>
              )}
            </Formik>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

AddUnitTransaction.propTypes = {
  doCreateTransaction: PropTypes.func,
  identity: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  addUnitTransaction: makeSelectAddUnitTransaction(),
  identity: makeSelectUnitIdentity(),
});

function mapDispatchToProps(dispatch) {
  return {
    doCreateTransaction: data => dispatch(createTransaction(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddUnitTransaction);
