/**
 *
 * ForgetPassword
 *
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import { Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { Input, Form, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { AuthContext } from 'utils/AuthContext';

const { Title } = Typography;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: 10,
  },
  layout: {
    marginTop: theme.spacing(2),
    // marginLeft:theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    // width: 500,
    textAlign: 'center',
  },
  layoutRight: {
    marginLeft: 108,
  },
}));

const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email Address is Required'),
});
export function ForgetPassword() {
  const classes = useStyles();

  const { forgetPassword } = useContext(AuthContext);

  return (
    <div>
      <Helmet>
        <title>ForgetPassword</title>
        <meta name="description" content="Description of ForgetPassword" />
      </Helmet>
      <div className={classes.root}>
        <Grid
          container
          spacing={0}
          direction="row-reverse"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <Title level={1} style={{ marginBottom: 15, padding: 10 }} />
            <div>
              <Title level={3} style={{ marginBottom: 15 }}>
                Forgot Your Password
              </Title>
              <Formik
                initialValues={{
                  email: '',
                }}
                validationSchema={EmailSchema}
                onSubmit={(values, actions) => {
                  // actions.setsetSubmitting(true)
                  forgetPassword(values);

                  actions.setSubmitting(false);
                }}
              >
                {({ isSubmitting,   touched }) => (
                  <Form size="normal" layout="vertical">
                    <Grid container spacing={1} direction="column">
                      <Grid item xs={12} sm={6}>
                        <Form.Item
                          // label="Email Address"
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
                      <Grid item xs={12} sm={6}>
                        <SubmitButton htmlType="submit" type="primary" block>
                          Reset Password
                        </SubmitButton>
                      </Grid>
                    </Grid>
                    <div style={{ marginTop: 30 }}>
                      {'Cant Login? Sign Up For An Account '}
                      <Link to="/register" style={{ margin: 10 }}>
                        Sign Up
                      </Link>
                      {'Or Already Have An Account?'}
                      <Link to="/login" style={{ margin: 10 }}>
                        Log In
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              alt="Forgot Password"
              src={require('./svg/forgot.svg')}
              height="550"
              width="70%"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

ForgetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(ForgetPassword);
