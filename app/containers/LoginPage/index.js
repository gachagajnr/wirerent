/**
 *
 * LoginPage
 *
 */

import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { Row, Col, Typography } from 'antd';
import { Formik } from 'formik';
import { Input, SubmitButton, Form } from 'formik-antd';
import { UserOutlined } from '@ant-design/icons';
import { AuthContext } from 'utils/AuthContext';
import messages from './messages';
import LoginSvg from './svg/login.svg';
const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: 10,
  },
  paper: {
    padding: theme.spacing(1),
    margin: 10,
    textAlign: 'center',
    // backgroundColor: '#001529',
  },
}));

const LoginSchema = Yup.object().shape({
  password: Yup.string().required('Password is Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email Address is Required'),
});

export function LoginPage() {
  const { login } = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>

      <Grid
        container
        spacing={0}
        justifyItems="center" 
        alignItems='center'
        direction="row-reverse"
       >
        <Grid item xs={12} sm={6}>
          <img src={LoginSvg} alt="Login" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={0}>
            <Title level={4} style={{ margin: 20, padding: 10 }}>
              Wirerent Your Renting & Property Partner;
            </Title>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={LoginSchema}
              onSubmit={(values, actions) => {
                login(values);
                actions.setSubmitting(false);
              }}
            >
              {({ isSubmitting,  touched }) => (
                <Form layout="vertical">
                  <Grid
                    container
                    direction="column"
                    justifyItems="center"
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={12}>
                      <Form.Item
                        label="Email Address"
                        name="email"
                        showValidateSuccess
                      >
                        <Input
                          name="email"
                          placeholder="Email Address"
                          prefix={<UserOutlined />}
                        />

                      </Form.Item>
                    </Grid>

                    <Grid item xs={12} sm={12}>
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
                      <SubmitButton htmlType="submit" type="primary" block>
                        Login
                      </SubmitButton>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
            <div style={{ marginTop: 30 }}>
              {'Sign Up For An Account '}
              <Link to="/register" style={{ margin: 10 }}>
                Sign Up
              </Link>
            </div>
            <Link to="/forget_password" style={{ padding: 10 }}>
              Forgot Password?
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} />
      </Grid>
    </div>
  );
}

export default compose(memo)(LoginPage);
