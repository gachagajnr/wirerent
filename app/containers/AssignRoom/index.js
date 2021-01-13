/**
 *
 * AssignRoom
 *
 */

import React, { memo, useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useHistory, useParams } from 'react-router-dom';
import {
  ArrowLeftOutlined,
  DownOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';

import {
  Button,
  message,
  Popover,
  Typography,
  Layout,
  Space,
  Divider,
} from 'antd';
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';
import { Input, Form, SubmitButton, Checkbox, Select } from 'formik-antd';
import Grid from '@material-ui/core/Grid';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { AuthContext } from 'utils/AuthContext';
import unitsMenu from 'menus/UnitsMenu/index';
import unitTypes from 'menus/UnitTypes/index';
import unitBills from 'menus/UnitBills/index';
import unitFeatures from 'menus/UnitFeatures/index';

import miscellaneousMenu from 'menus/MiscellaneousMenu/index';
import paymentOptions from 'menus/PaymentOptions/index';
import GlobalHeader from 'containers/GlobalHeader/index';

import Wizard, { Steps, Step } from 'components/Wizard/index';
import NextButton from 'components/NextButton/index';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import { makeSelectAssignRoom, makeSelectBuildings } from './selectors';
import { getBuildings, createRoom } from './actions';
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const { Header, Content } = Layout;

const NewRoomSchema = Yup.object().shape({
  identity: Yup.string().required('Identity is Required'),
  rent: Yup.number().required('Rent Amount is Required'),
  type: Yup.string().required('Unit Type is Required'),
  meterno: Yup.string().required('Meter Number is Required'),
  quote: Yup.string().required('Room Quote is Required'),
  bills: Yup.string().required('Choose Bills Associated'),
  floor: Yup.string().required('Floor No is Required'),
  features: Yup.string().required('Features are Required'),

  signed: Yup.string().required('Has signed is Required'),
  notes: Yup.string().required('Notes are Required'),
  idnumber: Yup.string().required('ID Number is Required'),
  mode: Yup.string().required('Paid Via is Required'),
  building: Yup.string().required('Paid Via is Required'),
});

export function AssignRoom({ doGetBuildings, buildings, doCreateNRoom }) {
  useInjectReducer({ key: 'assignRoom', reducer });
  useInjectSaga({ key: 'assignRoom', saga });
  const history = useHistory();
  const { id } = useParams();

  const [value, setValue] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    doGetBuildings(user.user.organization);
  }, []);
  console.log(buildings);

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }
  function handleSubmit(values) {
    doCreateNRoom(values);
  }
  const formData = {
    identity: '',
    type: '',
    rent: '',
    bills: '',
    floor: '',
    quote: '',
    meterno: '',
    features: '',
    building: '',
    mode: '',
    idnumber: '',
    signed: '',
    notes: '',
    agent: user.user.organization,
    request: id,
  };
  return (
    <div>
      <Helmet>
        <title>AssignRoom</title>
        <meta name="description" content="Description of AssignRoom" />
      </Helmet>

      <Layout>
        <GlobalHeader
          title="Assing Tenant To A New Room"
          className="site-page-header"
          extra={[]}
        />

        <Content style={{ marginTop: 55 }}>
          <Formik
            validationSchema={NewRoomSchema}
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
                        <Grid container spacing={2}>
                          <Divider orientation="left"> Building</Divider>

                          <div
                            style={{
                              marginLeft: 'auto',
                              marginRight: 'auto',
                            }}
                          >
                            <Form.Item
                              label="Select Building"
                              name="mode"
                              showValidateSuccess
                            >
                              <Select
                                showSearch
                                name="building"
                                style={{ width: 250 }}
                                placeholder="Select Building"
                                optionFilterProp="children"
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                  option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                }
                              >
                                {buildings.map((building, key) => (
                                  <Option
                                    key={building._id}
                                    value={building._id}
                                  >
                                    {building.name}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>
                        </Grid>
                        <NextButton
                          type="primary"
                          setTouched={setTouched}
                          validateForm={validateForm}
                          next={next}
                          fields={['building']}
                        >
                          Next
                        </NextButton>
                      </>
                    )}
                  </Step>
                  <Step>
                    {({ previous, next }) => (
                      <>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Form.Item
                              label="Unit Identity"
                              name="identity"
                              showValidateSuccess
                            >
                              <Input
                                name="identity"
                                placeholder="Unit Identity"
                              />
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
                              name="type"
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

                        <Space direction="vertical">
                          <Button
                            type="primary"
                            block
                            icon={<ArrowLeftOutlined />}
                            onClick={previous}
                          >
                            Back
                          </Button>
                          <NextButton
                            type="primary"
                            // disabled={!readTerms}
                            setTouched={setTouched}
                            validateForm={validateForm}
                            next={next}
                            fields={[
                              'identity',
                              'rent',
                              'floor',
                              'quote',
                              'type',
                              'meterno',
                              'features',
                              'bills',
                            ]}
                          >
                            Next
                          </NextButton>
                        </Space>
                      </>
                    )}
                  </Step>
                  <Step>
                    {({ previous, next }) => (
                      <>
                        <Grid container spacing={2}>
                          <Divider orientation="left">Payment Details</Divider>
                          <Grid item xs={12}>
                            <Form.Item
                              label="Paid Via"
                              name="mode"
                              showValidateSuccess
                            >
                              <Select
                                name="mode"
                                placeholder="Paid Via"
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
                              label="ID Number"
                              name="idnumber"
                              showValidateSuccess
                            >
                              <Input name="idnumber" placeholder="ID Number" />
                            </Form.Item>
                          </Grid>
                          <Grid item xs={12}>
                            <Form.Item
                              label="Agreement"
                              name="signed"
                              showValidateSuccess
                            >
                              <Checkbox
                                name="signed"
                                placeholder="Has Signed Agreement"
                              />
                            </Form.Item>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Form.Item
                              label="Additional Notes"
                              name="notes"
                              showValidateSuccess
                            >
                              <TextArea
                                name="notes"
                                placeholder="Additional Notes"
                                style={{ width: '100%' }}
                                rows={6}
                              />
                            </Form.Item>
                          </Grid>
                        </Grid>
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
                            fields={['mode', 'signed', 'idnumber', 'notes']}
                            onClick={submitForm}
                            block
                          >
                            Create Tenant
                          </Button>
                        </Space>
                      </>
                    )}
                  </Step>
                </Steps>
              </Wizard>
            )}
          </Formik>
        </Content>
      </Layout>
    </div>
  );
}

AssignRoom.propTypes = {
  doGetBuildings: PropTypes.func.isRequired,
  doCreateNRoom: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  assignRoom: makeSelectAssignRoom(),
  buildings: makeSelectBuildings(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetBuildings: id => dispatch(getBuildings(id)),
    doCreateNRoom: data => dispatch(createRoom(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AssignRoom);
