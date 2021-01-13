/**
 *
 * AddNewAgency
 *
 */

import * as Yup from 'yup';

import { Form, Input, ResetButton, SubmitButton } from 'formik-antd';
import React, { memo } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { addAgency } from 'containers/Agency/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserName } from 'containers/App/selectors';
import messages from './messages';
import reducer from 'containers/Agency/reducer';
import saga from 'containers/Agency/saga';
import { useHistory } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const { Header, Content } = Layout;

const AgentSchema = Yup.object().shape({
  name: Yup.string().required('Name is Required'),
  phone: Yup.string().required('Phone Number is Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email Address is Required'),
  website: Yup.string()
    .url('Must be a valid Url or contain http prefix')
    .required('Website is Required'),
  headquarters: Yup.string().required('Headquarters is Required'),
  address: Yup.string().required('Address is Required'),
  street: Yup.string().required('Street name is Required'),
  city: Yup.string().required('City Name is Required'),
});

export function AddNewAgency({ doCreateAgency, agency }) {
  useInjectReducer({ key: 'agency', reducer });
  useInjectSaga({ key: 'agency', saga });
  const history = useHistory();

  return (
    <div>
      <Helmet>
        <title>AddNewAgency</title>
        <meta name="description" content="Description of AddNewAgency" />
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
                  Create New Agency
                </Typography>
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </Header>

          <Content style={{ marginTop: 90, padding: 30 }}>
            <Formik
              initialValues={{
                name: '',
                email: '',
                // idnumber: '',
                // admins_phone: '',
                headquarters: '',
                address: '',
                phone: '',
                website: '',
                street: '',
                city: '',
              }}
              validationSchema={AgentSchema}
              onSubmit={(values, actions) => {
                doCreateAgency(values);
                actions.setSubmitting(false);

                // actions.resetForm();
              }}
            >
              {({ isSubmitting,  touched }) => (
                <Form size="middle">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Full Name"
                        name="name"
                        showValidateSuccess
                      >
                        <Input name="name" placeholder="Agency Name" />

                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Company Email Address"
                        name="email"
                        showValidateSuccess
                      >
                        <Input
                          name="email"
                          placeholder="Company Email Address"
                        />

                      </Form.Item>
                    </Grid>

                    <Grid item xs={12}>
                      <Form.Item
                        label="Website"
                        name="website"
                        showValidateSuccess
                      >
                        <Input
                          name="website"
                          placeholder="Website"
                          addonBefore="http://"
                        />

                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Agency Phone Number"
                        name="phone"
                        showValidateSuccess
                      >
                        <Input
                          name="phone"
                          placeholder="Agency Phone Number"
                          addonBefore="+254"
                        />

                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Address"
                        name="address"
                        showValidateSuccess
                      >
                        <Input name="address" placeholder="Address" />

                      </Form.Item>
                    </Grid>
                    <Grid item xs={12}>
                      <Form.Item
                        label="Headquarters"
                        name="headquarters"
                        showValidateSuccess
                      >
                        <Input name="headquarters" placeholder="Headquarters" />

                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Street Name"
                        name="street"
                        showValidateSuccess
                      >
                        <Input name="street" placeholder="Street" />

                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item label="City" name="city" showValidateSuccess>
                        <Input name="city" placeholder="City" />

                      </Form.Item>
                    </Grid>
                  </Grid>
                  <SubmitButton>Create Agency</SubmitButton>
                  <ResetButton />
                </Form>
              )}
            </Formik>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

AddNewAgency.propTypes = {
  doCreateAgency: PropTypes.func,
  agency: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  agency: makeSelectUserName(),
});

function mapDispatchToProps(dispatch) {
  return {
    doCreateAgency: data => dispatch(addAgency(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddNewAgency);
