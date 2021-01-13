/**
 *
 * NewBuildingAdmin
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

import { Layout, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import { Input, Form, SubmitButton, Radio, Select } from 'formik-antd';
import * as Yup from 'yup';
import GlobalHeader from 'containers/GlobalHeader/index';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createBAdmin } from 'containers/BuildingAdmins/actions';
import reducer from 'containers/BuildingAdmins/reducer';
import saga from 'containers/BuildingAdmins/saga';
import makeSelectNewBuildingAdmin from './selectors';
import messages from './messages';
const { Content, Header } = Layout;
const { Option } = Select;

const BuildingAdminSchema = Yup.object().shape({
  fname: Yup.string()
    .min(2, 'Name Too Short!')
    .max(20, 'Name Too Long!')
    .required('Name is Required'),
  mname: Yup.string()
    .min(2, 'Middle Name Too Short!')
    .max(20, 'Middle Name Too Long!')
    .required('Middle Name is Required'),
  lname: Yup.string()
    .min(3, 'Last Name Too Short!')
    .max(20, 'Last Name Too Long!')
    .required('Last Name is Required'),
  phone: Yup.string()
    .min(9, 'Phone Number Too Short!')
    .max(10, 'Phone Number Too Long!')
    .required('Phone Number is Required'),
  phone2: Yup.string()
    .min(9, 'Phone Number 2 Too Short!')
    .max(10, 'Phone Number 2 Too Long!')
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

export function NewBuildingAdmin({ doCreateBAdmin }) {
  useInjectReducer({ key: 'buildingAdmins', reducer });
  useInjectSaga({ key: 'buildingAdmins', saga });
  const { id } = useParams();
  const history = useHistory();

  return (
    <div>
      <Helmet>
        <title>NewBuildingAdmin</title>
        <meta name="description" content="Description of NewBuildingAdmin" />
      </Helmet>
      <Layout>
 <GlobalHeader
          title="Invite Building Admin"
          className="site-page-header"
          extra={[

          ]}
        />


          <Content style={{ marginTop: 55  }}>
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
                building: id,
              }}
              validationSchema={BuildingAdminSchema}
              onSubmit={(values, actions) => {
                // alert(JSON.stringify(values));
                doCreateBAdmin(values);
                actions.setSubmitting(false);
              }}
            >
              {({ isSubmitting,  touched }) => (
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
                        style={{ borderRadius: 60 }}
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
                          // options={options} borderRadius: 60
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
                  <SubmitButton>Invite Building Admin</SubmitButton>
                </Form>
              )}
            </Formik>
          </Content>

      </Layout>
    </div>
  );
}

NewBuildingAdmin.propTypes = {
  doCreateBAdmin: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  newBuildingAdmin: makeSelectNewBuildingAdmin(),
});

function mapDispatchToProps(dispatch) {
  return {
    doCreateBAdmin: data => dispatch(createBAdmin(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewBuildingAdmin);
