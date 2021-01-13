/**
 *
 * NewAgencyAdmin
 *
 */

import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useHistory } from 'react-router-dom';
import { Layout, Typography, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import {
  Input,
  Form,
  SubmitButton,
  Radio,
  Select,
  ResetButton,
} from 'formik-antd';
import * as Yup from 'yup';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createAAdmin } from 'containers/AgencyAdmins/actions';
import { AuthContext } from 'utils/AuthContext';
import GlobalHeader from 'containers/GlobalHeader/index';

import makeSelectNewAgencyAdmin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { Content, Header } = Layout;
const { Option } = Select;

const AgencyAdminSchema = Yup.object().shape({
  fname: Yup.string()
    .min(3, 'Name Too Short!')
    .max(20, 'Name Too Long!')
    .required('Name is Required'),
  mname: Yup.string()
    .min(3, 'Middle Name Too Short!')
    .max(20, 'Middle Name Too Long!')
    .required('Middle Name is Required'),
  lname: Yup.string()
    .min(3, 'Last Name Too Short!')
    .max(20, 'Last Name Too Long!')
    .required('Last Name is Required'),
  phone: Yup.string()
    .min(9, 'Phone Number Too Short!')

    .required('Phone Number is Required'),
  phone2: Yup.string()
    .min(9, 'Phone Number 2 Too Short!')

    .required('Phone Number 2 is Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email Address is Required'),
  residence: Yup.string().required('Residence is Required'),
  sex: Yup.string().required('Sex is Required'),
  idnumber: Yup.string()
    .min(5, 'Address Too Short!')
    .max(15, 'Address Too Long')
    .required('Address is Required'),
  right: Yup.string().required('Right is Required'),
});

export function NewAgencyAdmin({ doCreateAAdmin }) {
  useInjectReducer({ key: 'newAgencyAdmin', reducer });
  useInjectSaga({ key: 'newAgencyAdmin', saga });
  const history = useHistory();
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Helmet>
        <title>NewAgencyAdmin</title>
        <meta name="description" content="Description of NewAgencyAdmin" />
      </Helmet>
      <Layout>
        <GlobalHeader
          color="#77815c"
          title=" New Agency Admin"
          // role={user.user.role}
          other={[]}
          className="site-page-header"
          extra={[]}
        />
        <Layout className="site-layout">
          <Content style={{ marginTop: 55 }}>
            <Formik
              initialValues={{
                fname: '',
                mname: '',
                lname: '',
                email: '',
                age: '',
                sex: '',
                phone: '',
                phone2: '',
                residence: '',
                idnumber: '',
                right: '',
                agency: user.user.organization,
              }}
              validationSchema={AgencyAdminSchema}
              onSubmit={(values, actions) => {
                // alert(JSON.stringify(values));
                doCreateAAdmin(values);
                actions.setSubmitting(false);

                // actions.resetForm();
              }}
            >
              {({ isSubmitting, touched }) => (
                <Form size="middle">
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Form.Item
                        label="First Name"
                        name="fname"
                        showValidateSuccess
                      >
                        <Input name="fname" placeholder="First Name" />
                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Form.Item
                        label="Middle Name"
                        name="mname"
                        showValidateSuccess
                      >
                        <Input name="mname" placeholder="Middle Name" />
                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Form.Item
                        label="Last Name"
                        name="lname"
                        showValidateSuccess
                      >
                        <Input name="lname" placeholder="Last Name" />
                      </Form.Item>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Email Address"
                        name="email"
                        showValidateSuccess
                      >
                        <Input name="email" placeholder="Email Address" />
                      </Form.Item>
                    </Grid>

                    <Grid item xs={12} sm={6}>
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
                        label="Phone Number"
                        name="phone"
                        showValidateSuccess
                      >
                        <Input
                          name="phone"
                          placeholder="Phone Number"
                          addonBefore="+254"
                        />
                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Phone Number 2"
                        name="phone2"
                        showValidateSuccess
                      >
                        <Input
                          name="phone2"
                          placeholder="Phone Number 2"
                          addonBefore="+254"
                        />
                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Residence"
                        name="residence"
                        showValidateSuccess
                      >
                        <Input name="residence" placeholder="Residence" />
                      </Form.Item>
                    </Grid>
                    <Grid item xs={12}>
                      <Form.Item label="Age" name="age" showValidateSuccess>
                        <Input name="age" placeholder="Age" />
                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item label="Sex" name="sex" showValidateSuccess>
                        <Radio.Group
                          name="sex"
                          // onChange={this.onChange}
                          // value={this.state.value}
                        >
                          <Radio value="Male">Male</Radio>
                          <Radio value="Female">Female</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Rights"
                        name="right"
                        showValidateSuccess
                      >
                        <Select
                          name="right"
                          // value="right"
                          // tagRender={tagRender}
                          // defaultValue={['']}
                          style={{ width: '100%' }}
                          // options={options}
                        >
                          <Option value="" label="Select Rights">
                            Select Rights
                          </Option>
                          <Option value="Full Access" label="Full Access">
                            Full Access
                          </Option>
                          <Option value="Write Only" label="Write Only">
                            Write Only
                          </Option>
                          <Option value="Read Only" label="Read Only">
                            Read Only
                          </Option>
                        </Select>
                      </Form.Item>
                    </Grid>
                  </Grid>
                  <SubmitButton>Create Agency Admin</SubmitButton>
                  <ResetButton>Reset Form</ResetButton>
                </Form>
              )}
            </Formik>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

NewAgencyAdmin.propTypes = {
  doCreateAAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  newAgencyAdmin: makeSelectNewAgencyAdmin(),
});

function mapDispatchToProps(dispatch) {
  return {
    doCreateAAdmin: data => dispatch(createAAdmin(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewAgencyAdmin);
