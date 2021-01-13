/**
 *
 * ResetPassword
 *
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Layout, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import { Input, Form, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';
import queryString from 'query-string';

import { AuthContext } from 'utils/AuthContext';
const { Content } = Layout;
const { Title } = Typography;

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
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
const Schema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password Too Short!')
    .required('Password is Required')

    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, //eslint-disable-line
      'Password Must Include Atleast One Uppercase Letter, Number and Special Characters',
    ),
  changepassword: Yup.string().when('password', {
    is: val => !!(val && val.length > 0),
    then: Yup.string().oneOf(
      [Yup.ref('password')],
      'Both password need to be the same',
    ),
  }),
});
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
export function ResetPassword() {
  const classes = useStyles();

  const location = useLocation();
  const va = queryString.parse(location.search);

  const { resetPassword } = useContext(AuthContext);

  return (
    <div>
      <Helmet>
        <title>ResetPassword</title>
        <meta name="description" content="Description of ResetPassword" />
      </Helmet>
      <Layout>
        <Content style={{ marginTop: 90, padding: 30 }}>
          <Title level={3} style={{ marginBottom: 15 }}>
            New Password
          </Title>
          <Formik
            initialValues={{
              password: '',
              changepassword: '',
              token: va.token,
            }}
            validationSchema={Schema}
            onSubmit={(values, actions) => {
              resetPassword(values);
              actions.setSubmitting(false);

              // actions.resetForm();
            }}
          >
            {({ isSubmitting,   touched }) => (
              <Form
                {...formItemLayout}
                size="middle"
                layout="vertical"
                scrollToFirstError
              >
                <Form.Item label="Password" name="password" showValidateSuccess>
                  <Input.Password
                    type="password"
                    name="password"
                    placeholder="password"
                    prefix={<LockOutlined />}
                    //   addonBefore={<}
                  />

                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="changepassword"
                  showValidateSuccess
                >
                  <Input.Password
                    type="password"
                    name="changepassword"
                    placeholder="Confirm Password"
                    prefix={<LockOutlined />}
                  />

                </Form.Item>

                <SubmitButton>Save</SubmitButton>
              </Form>
            )}
          </Formik>
        </Content>
      </Layout>
    </div>
  );
}

ResetPassword.propTypes = {
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

export default compose(withConnect)(ResetPassword);
