/**
 *
 * SignUpPage
 *
 */

import React, { memo, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { Checkbox, Button, Typography, Space } from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { Input, Form, SubmitButton, Radio } from 'formik-antd';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { AuthContext } from 'utils/AuthContext';
import Wizard, { Steps, Step } from 'components/Wizard/index';
import NextButton from 'components/NextButton/index';
import { signup } from './actions';
import { makeSelectSignUpPage } from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import SignUpSvg from './svg/signup.svg';
const { Title, Paragraph, Text } = Typography;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  layout: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    width: 500,
    textAlign: 'center',
  },
  layoutRight: {
    marginLeft: 108,
  },
  radio: {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  },
}));

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password Too Short!')
    .required('Password is Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, //eslint-disable-line
      'Password Must Include One Uppercase Letter, Number and Special Characters',
    ),
  email: Yup.string()
    .email('Invalid email')
    .required('Email Address is Required'),
  phone: Yup.number().required('Phone Number is Required'),
  firstName: Yup.string().required('Name is Required'),
  surname: Yup.string().required('Surname is Required'),
  role: Yup.string().required('Select A Role'),
  organization_name: Yup.string().required('Organization Name is Required'),
});

const formData = {
  firstName: '',
  surname: '',
  password: '',
  email: '',
  phone: '',
  role: '',
  organization_name: '',
};

export function SignUpPage({ doSignUp }) {
  useInjectReducer({ key: 'signUpPage', reducer });
  useInjectSaga({ key: 'signUpPage', saga });
  const classes = useStyles();

  const [readTerms, setReadTerms] = useState('');
  const [value, setValue] = useState('');
  const { user, signup } = useContext(AuthContext);

  function handleSubmit(values) {
    signup(values);
  }
  function onChange(e) {
    // console.log('radio checked', e.target.value);
    setValue(e.target.value);
  }

  return (
    <div>
      <Helmet>
        <title>SignUpPage</title>
        <meta name="description" content="Description of SignUpPage" />
      </Helmet>
      <div className={classes.root}>
        <Grid
          container
          spacing={0}
          direction="row-reverse"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={12} sm={6}>
            <div className={classes.layout}>
              <Title level={3} style={{ marginBottom: 15 }}>
                Get Started with WireRent
              </Title>

              <Formik
                validationSchema={SignupSchema}
                initialValues={formData}
                onSubmit={handleSubmit}
              >
                {({
                  values,

                  touched,
                  validateForm,
                  setTouched,
                  submitForm,
                }) => (
                  <Wizard>
                    <Steps>
                      <Step>
                        {({ next }) => (
                          <>
                            <Title level={2} style={{ marginBottom: 15 }}>
                              My Preference
                            </Title>
                            <Grid
                              container
                              direction="column"
                              justify="center"
                              alignItems="center"
                              spacing={3}
                            >
                              <Grid item xs={12}>
                                <Form.Item name="role">
                                  <Radio.Group name="role" onChange={onChange}>
                                    <Space direction="vertical">
                                      <Paper
                                        elevation={3}
                                        style={{ padding: 10 }}
                                      >
                                        <Radio
                                          className={classes.radio}
                                          value="tenant"
                                        >
                                          Manage My Room
                                        </Radio>
                                      </Paper>
                                      <Paper
                                        elevation={3}
                                        style={{ padding: 10 }}
                                      >
                                        <Radio
                                          className={classes.radio}
                                          value="agency_admin"
                                        >
                                          Manage Building/Buildings
                                        </Radio>
                                      </Paper>
                                    </Space>
                                  </Radio.Group>
                                </Form.Item>
                              </Grid>
                              <Checkbox
                                onChange={e => setReadTerms(e.target.checked)}
                                style={{ padding: 20 }}
                              >
                                I have Read{' '}
                                <a href="/terms">Terms and Conditions</a>
                              </Checkbox>
                            </Grid>

                            <div>
                              <NextButton
                                type="primary"
                                disabled={!readTerms}
                                setTouched={setTouched}
                                validateForm={validateForm}
                                next={next}
                                fields={['role']}
                              >
                                Next
                              </NextButton>
                            </div>
                          </>
                        )}
                      </Step>
                      <Step>
                        {({ previous, next }) => (
                          <>
                            {value === 'agency_admin' ? (
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                  <Form.Item
                                    label="First Name"
                                    name="firstName"
                                    showValidateSuccess
                                  >
                                    <Input
                                      name="firstName"
                                      placeholder="First Name"
                                      prefix={<UserOutlined />}
                                    />

                                  </Form.Item>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Form.Item
                                    label="Surname"
                                    name="surname"
                                    showValidateSuccess
                                  >
                                    <Input
                                      name="surname"
                                      placeholder="Surname"
                                      prefix={<UserOutlined />}
                                    />

                                  </Form.Item>
                                </Grid>
                                <Grid item xs={12}>
                                  <Form.Item
                                    label="Organization Name"
                                    name="organization_name"
                                    showValidateSuccess
                                  >
                                    <Input
                                      name="organization_name"
                                      placeholder="Organization Name"
                                      prefix={<UserOutlined />}
                                    />

                                  </Form.Item>
                                </Grid>
                                <Grid item xs={12}>
                                  <Form.Item
                                    label="Organization Phone"
                                    name="phone"
                                    showValidateSuccess
                                  >
                                    <Input
                                      name="phone"
                                      placeholder="Organization Phone"
                                      prefix={<PhoneOutlined />}
                                    />

                                  </Form.Item>
                                </Grid>
                                <Grid item xs={12}>
                                  <Form.Item
                                    label="Organization Email Address"
                                    name="email"
                                    showValidateSuccess
                                  >
                                    <Input
                                      name="email"
                                      placeholder=" Organization Email Address"
                                      prefix={<MailOutlined />}
                                    />

                                  </Form.Item>
                                </Grid>
                                <Grid item xs={12}>
                                  <Form.Item
                                    label="Password"
                                    name="password"
                                    showValidateSuccess
                                  >
                                    <Input.Password
                                      name="password"
                                      placeholder="Password"
                                    />

                                  </Form.Item>
                                </Grid>
                              </Grid>
                            ) : (
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                  <Form.Item
                                    label="First Name"
                                    name="firstName"
                                    showValidateSuccess
                                  >
                                    <Input
                                      name="firstName"
                                      placeholder="First Name"
                                      prefix={<UserOutlined />}
                                    />

                                  </Form.Item>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Form.Item
                                    label="Surname"
                                    name="surname"
                                    showValidateSuccess
                                  >
                                    <Input
                                      name="surname"
                                      placeholder="Surname"
                                      prefix={<UserOutlined />}
                                    />

                                  </Form.Item>
                                </Grid>
                                <Grid item xs={12}>
                                  <Form.Item
                                    label="Room Name"
                                    name="organization_name"
                                    showValidateSuccess
                                  >
                                    <Input
                                      name="organization_name"
                                      placeholder="Room Name"
                                      prefix={<UserOutlined />}
                                    />

                                  </Form.Item>
                                </Grid>
                                <Grid item xs={12}>
                                  <Form.Item
                                    label="Phone Number"
                                    name="phone"
                                    showValidateSuccess
                                  >
                                    <Input
                                      name="phone"
                                      placeholder="Phone Number"
                                      prefix={<PhoneOutlined />}
                                    />

                                  </Form.Item>
                                </Grid>
                                <Grid item xs={12}>
                                  <Form.Item
                                    label="Email Address"
                                    name="email"
                                    showValidateSuccess
                                  >
                                    <Input
                                      name="email"
                                      placeholder="Email Address"
                                      prefix={<MailOutlined />}
                                    />

                                  </Form.Item>
                                </Grid>
                                <Grid item xs={12}>
                                  <Form.Item
                                    label="Password"
                                    name="password"
                                    showValidateSuccess
                                  >
                                    <Input.Password
                                      name="password"
                                      placeholder="Password"
                                    />

                                  </Form.Item>
                                </Grid>
                              </Grid>
                            )}
                            <Space direction="vertical">
                              <Button
                                type="primary"
                                block
                                icon={<ArrowLeftOutlined />}
                                onClick={previous}
                              >
                                Back
                              </Button>
                              <Button
                                type="primary"
                                // disabled={!readTerms}
                                fields={[
                                  'email',
                                  'password',
                                  'phone',
                                  'firstName',
                                  'surname',
                                ]}
                                onClick={submitForm}
                                block
                              >
                                Create Account
                              </Button>
                            </Space>
                          </>
                        )}
                      </Step>
                    </Steps>
                  </Wizard>
                )}
              </Formik>

              <div style={{ marginTop: 30 }}>
                {'Already Have An Account? '}
                <Link to="/login" style={{ margin: 10 }}>
                  Sign In
                </Link>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img src={SignUpSvg} alt="signup" height="550" width="70%" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

SignUpPage.propTypes = {
  doSignUp: PropTypes.func.isRequired,
  // user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  // user: makeSelectSignUpPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    doSignUp: data => dispatch(signup(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SignUpPage);
