/**
 *
 * NewUnit
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
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Layout, Typography } from 'antd';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import { Input, Form, SubmitButton, Select } from 'formik-antd';
import * as Yup from 'yup';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import unitTypes from 'menus/UnitTypes/index';
import unitBills from 'menus/UnitBills/index';
import unitFeatures from 'menus/UnitFeatures/index';

import { makeSelectName } from 'containers/Building/selectors';
import { createRoom } from 'containers/Units/actions';

import reducer from 'containers/Units/reducer';
import saga from 'containers/Units/saga';
import { makeSelectNewUnit } from './selectors';
import messages from './messages';

const { Content, Header } = Layout;
const { Option } = Select;

const UnitSchema = Yup.object().shape({
  identity: Yup.string()
    .min(1, 'Identity Too Short!')
    .max(10, 'Identity Too Long!')
    .required('Identity is Required'),
  rent: Yup.number().required('Rent Amount is Required'),
  type: Yup.string().required('Unit Type is Required'),
  meterno: Yup.string().required('Meter Number is Required'),
  quote: Yup.string().required('Room Quote is Required'),
  bills: Yup.string().required('Choose Bills Associated'),
  floor: Yup.string().required('Floor No is Required'),
  features: Yup.string().required('Features are Required'),
});

export function NewUnit({ name, doCreateUnit }) {
  useInjectReducer({ key: 'units', reducer });
  useInjectSaga({ key: 'units', saga });
  const history = useHistory();
  const { id } = useParams();

  return (
    <div>
      <Helmet>
        <title>NewUnit</title>
        <meta name="description" content="Description of NewUnit" />
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
                  Create New Room in{` ${name}`}
                </Typography>
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </Header>

          <Content style={{ marginTop: 90, padding: 10 }}>
            <Formik
              initialValues={{
                identity: '',
                type: '',
                rent: '',
                bills: '',
                floor: '',
                quote: '',
                meterno: '',
                features: '',
                building: id,
              }}
              validationSchema={UnitSchema}
              onSubmit={(values, actions) => {
                doCreateUnit(values);
                // alert(JSON.stringify(values));
                actions.setSubmitting(false);
              }}
            >
              {({ isSubmitting,   touched }) => (
                <Form size="middle" type="vertical">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>


                      <Form.Item
                        label="Unit Identity"
                        name="identity"
                        showValidateSuccess
                      >
                        <Input name="identity" placeholder="Unit Identity" />
                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>

                      <Form.Item
                        label="Rent Amount"
                        name="rent"
                        showValidateSuccess
                      >
                        <Input name="rent" placeholder="Rent Amount" />
                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>

                      <Form.Item
                        label="Floor No"
                        name="floor"
                        showValidateSuccess
                      >
                        <Input name="floor" placeholder="Floor No" />
                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Quote Amount"
                        name="quote"
                        showValidateSuccess
                      >
                        <Input
                          type="number"
                          name="quote"
                          placeholder="Quote Amount"
                        />
                      </Form.Item>

                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Type of Unit"
                        name="units"
                        showValidateSuccess
                      >
                        <Select
                          name="type"
                          placeholder="Select Unit Type"
                          style={{ width: '100%' }}
                        >
                          {unitTypes.menus.map(item => (
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

                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Meter Number"
                        name="meterno"
                        showValidateSuccess
                      >
                        <Input
                          name="meterno"
                          placeholder="Meter Number"
                          style={{ width: '100%' }}
                        />
                      </Form.Item>

                    </Grid>

                    <Grid item xs={12}>
                      <Form.Item
                        label="Features"
                        name="features"
                        showValidateSuccess
                      >
                        <Select
                          mode="multiple"
                          name="features"
                          placeholder="select Features Available"
                          style={{ width: '100%' }}
                        >
                          {unitFeatures.menus.map(item => (
                            <Option
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
                        label="Additional Bills"
                        name="bills"
                        showValidateSuccess
                      >
                        <Select
                          mode="multiple"
                          name="bills"
                          placeholder="Select Bills"
                          style={{ width: '100%' }}
                        >
                          {unitBills.menus.map(item => (
                            <Option
                              name="bills"
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
                  </Grid>
                  <SubmitButton>Create Unit</SubmitButton>
                </Form>
              )}
            </Formik>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

NewUnit.propTypes = {
  doCreateUnit: PropTypes.func,
  name: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  newUnit: makeSelectNewUnit(),
  name: makeSelectName(),
});

function mapDispatchToProps(dispatch) {
  return {
    doCreateUnit: data => dispatch(createRoom(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewUnit);
