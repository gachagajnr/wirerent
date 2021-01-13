/**
 *
 * AssignExistingRoom
 *
 */

import React, { memo, useEffect, useContext } from 'react';
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
  BuildOutlined,
  HomeOutlined,
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
import GlobalHeader from 'containers/GlobalHeader/index';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { AuthContext } from 'utils/AuthContext';
import unitsMenu from 'menus/UnitsMenu/index';
import unitTypes from 'menus/UnitTypes/index';
import unitBills from 'menus/UnitBills/index';
import unitFeatures from 'menus/UnitFeatures/index';

import miscellaneousMenu from 'menus/MiscellaneousMenu/index';
import paymentOptions from 'menus/PaymentOptions/index';

import Wizard, { Steps, Step } from 'components/Wizard/index';
import NextButton from 'components/NextButton/index';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import { assignRoom, getRooms } from './actions';
import { makeSelectAssignExistingRoom } from './selectors';
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const { Header, Content } = Layout;

const NewRoomSchema = Yup.object().shape({
  signed: Yup.string().required('Has signed is Required'),
  notes: Yup.string().required('Notes are Required'),
  idnumber: Yup.string().required('ID Number is Required'),
  mode: Yup.string().required('Paid Via is Required'),
  room: Yup.string().required('Room is Required'),
});

export function AssignExistingRoom({ rooms, doAssignTenant, doGetRooms }) {
  useInjectReducer({ key: 'assignExistingRoom', reducer });
  useInjectSaga({ key: 'assignExistingRoom', saga });

  const history = useHistory();
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    doGetRooms(user.user.organization);
  }, []);

  function onBlur() {
   }

  function onFocus() {
   }

  function onSearch(val) {
   }
  function handleSubmit(values) {
 
    doAssignTenant(values);
  }
  const formData = {
    room: '',
    mode: '',
    idnumber: '',
    signed: '',
    notes: '',
    request: id,
  };
  return (
    <div>
      <Helmet>
        <title>AssignExistingRoom</title>
        <meta name="description" content="Description of AssignExistingRoom" />
      </Helmet>
      <Layout>
        <GlobalHeader
          title="Assing Tenant To Existing Room"
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
                          <Divider orientation="left"> Room</Divider>

                          <div
                            style={{
                              marginLeft: 'auto',
                              marginRight: 'auto',
                            }}
                          >
                            <Form.Item
                              label="Select Room"
                              name="room"
                              showValidateSuccess
                            >
                              <Select
                                showSearch
                                name="room"
                                style={{ width: 250 }}
                                placeholder="Select Vacant Room"
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
                                {rooms.map((room, key) => (
                                  <Option key={room._id} value={room._id}>
                                    {`${room.identity} ${room.building_name}`}
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
                          fields={['room']}
                        >
                          Next
                        </NextButton>
                      </>
                    )}
                  </Step>

                  <Step>
                    {({ previous }) => (
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
                            Assign Tenant
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

AssignExistingRoom.propTypes = {
  doAssignTenant: PropTypes.func.isRequired,
  doGetRooms: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  rooms: makeSelectAssignExistingRoom(),
});

function mapDispatchToProps(dispatch) {
  return {
    doAssignTenant: data => dispatch(assignRoom(data)),
    doGetRooms: organization => dispatch(getRooms(organization)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AssignExistingRoom);
