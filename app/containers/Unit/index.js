/**
 *
 * Unit
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useParams, useHistory, Link } from 'react-router-dom';
// import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import {
  Divider,
  Card,
  Dropdown,
  Modal,
  Button,
  Upload,
  message,
  Menu,
  Layout,
  List,
  Input as Inpu,
  Comment,
  Tag,
  DatePicker,
  Typography,
  Tooltip,
  Descriptions,
  Space,
  Drawer,
  Tabs,
} from 'antd';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

import { Formik } from 'formik';
import { Form, Input, SubmitButton, Radio } from 'formik-antd';
import {
  PaperClipOutlined,
  InfoCircleOutlined,
  AlertOutlined,
  LoadingOutlined,
  PrinterFilled,
  PlusOutlined,
  CloudUploadOutlined,
  MoneyCollectOutlined,
  UserOutlined,
  CheckCircleTwoTone,
  FolderOpenOutlined,
  DownOutlined,
  UserDeleteOutlined,
  UnorderedListOutlined,
  ArrowLeftOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import PaymentCard from 'components/PaymentCard/index';

import Avatar from '@material-ui/core/Avatar';
import GlobalHeader from 'containers/GlobalHeader/index';
import RoomCard from 'components/RoomCard/index';
import ContentCard from 'components/ContentCard/index';
import ProfileCard from 'components/ProfileCard/index';
import UnitTabs from 'components/UnitTabs/index';

import Can from 'utils/Can';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import app from 'utils/api';
import {
  makeSelectUnit,
  makeSelectNotices,
  makeSelectContacts,
  makeSelectAlerts,
  makeSelectChatrooms,
  makeSelectRequests,
  makeSelectReceipts,
} from './selectors';
import {
  getUnit,
  requestMoveOut,
  sendNotice,
  cancelReqMove,
  sendSms,
  sendEmail,
  removeTenant,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { Header, Content } = Layout;

const { TextArea } = Input;

const { TabPane } = Tabs;
const { Text, Title } = Typography;

export function Unit({
  unit,
  doGetUnit,
  notices,
  contacts,
  alerts,
  chatrooms,
  requests,
  receipts,
  doRequestMoveOut,
  doSendSpecialNotice,
  doCancelReqMove,
  doSendEmail,
  doSendSMS,
  doRemoveUser,
}) {
  useInjectReducer({ key: 'unit', reducer });
  useInjectSaga({ key: 'unit', saga });
  const { id } = useParams();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [cam, setCam] = useState(false);
  const [tran, setTran] = useState(false);
  const [value, setValue] = useState('Vacate');
  const [date, setDate] = useState('');
  const [paid, setPaid] = useState('');
  const [specialDate, setSpecialDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [comm, setComm] = useState({
    visible: false,
    to: '',
    recepient: '',
    agent: '',
    type: '',
  });
  const [text, setText] = useState('');

  useEffect(() => {
    doGetUnit(id);
  }, []);

  let total = 0;
  let meterNo,type,floor,rent,identity = 'ff';
  let features = [];
  let bills = [];
  let moveoutRequested = null;
  if (unit.identity) {
    total = receipts.reduce((prev, next) => +prev + +next.amount, 0);
    if (total === unit.rent) {
      total = 0;
    } else {
      total = unit.rent - total;
    }
    features = unit.features;
    bills = unit.bills;
    moveoutRequested = unit.moveoutRequested;
    meterNo = unit.meterno;
    type=unit.type
    rent=unit.rent
    floor=unit.floor
    identity=unit.identity
  }
  app.io.on('rooms patched', function(event) {
    doGetUnit(id);
  });
  app.io.on('requests created', function(event) {
    doGetUnit(id);
  });
  app.io.on('requests patched', function(event) {
    doGetUnit(id);
  });
  app.io.on('add-requests created', function(event) {
    doGetUnit(id);
  });
  app.io.on('add-requests patched', function(event) {
    doGetUnit(id);
  });
  app.io.on('receipts created', function(event) {
    doGetUnit(id);
  });
  app.io.on('receipts patched', function(event) {
    doGetUnit(id);
  });
  app.io.on('notices created', function(event) {
    doGetUnit(id);
  });
  app.io.on('special-notices created', function(event) {
    doGetUnit(id);
  });
  app.io.on('special-notices removed', function(event) {
    doGetUnit(id);
  });
  app.io.on('contacts created', function(event) {
    doGetUnit(id);
  });
  // need custom event
  app.io.on('users patched', function(event) {
    history.goBack();
  });

  function onChange(e) {
    setValue(e.target.value);
  }
  function onClose() {
    setCam(false);
  }

  function onDateChange(e, dateString) {
    setDate(dateString);
  }
  function onSpecialDateChange(e, dateString) {
    setSpecialDate(dateString);
  }
  function onAmountChange(e) {
    setPaid(e.target.value);
    e.preventDefault();
  }

  function handleCommChange(e) {
    setText(e.target.value);

    e.preventDefault();
  }

  function sendText() {
    const sms = { text, comm };
    doSendSMS(sms);
    setText('');
  }
  function sendMail() {
    const sms = { text, comm };
    doSendEmail(sms);
    setText('');
  }
  return (
    <div>
      <Helmet>
        <title>Unit</title>
        <meta name="description" content="Description of Unit" />
      </Helmet>
      <Layout>
        <GlobalHeader
          color="#77815c"
          title={`${unit.identity} ${unit.building_name}`}
          // role={user.user.role}
          other={[<Space />]}
          className="site-page-header"
          extra={[]}
        />

          <Content style={{ marginTop: 55 }}>
            <Modal
              visible={visible}
              centered
              footer={null}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
            >
              <Divider orientation="left">Special Notice</Divider>

              <Formik
                initialValues={{
                  value,
                  description: '',
                  date: specialDate,
                  room: id,
                  title: '',
                }}
                // validationSchema={SpecialSchema}
                onSubmit={(values, actions) => {
                  doSendSpecialNotice(values);
                  actions.resetForm();
                  // alert(JSON.stringify(values));
                }}
              >
                {({ isSubmitting, touched }) => (
                  <Form>
                    <Radio.Group
                      onChange={onChange}
                      defaultValue="Vacate"
                      value={value}
                      name="value"
                    >
                      <Radio value="Vacate">
                        <Tag color="green">Vacate</Tag>
                      </Radio>
                      <Radio value="LoudMusic">
                        <Tag color="cyan">LoudMusic</Tag>
                      </Radio>
                      <Radio value="Other">
                        <Tag color="indigo">Other</Tag>
                      </Radio>
                    </Radio.Group>
                    <Form.Item
                      label="Title"
                      name="title"
                      showValidateSuccess
                      style={{ marginTop: 16 }}
                    >
                      <Input name="title" placeholder="Title" />
                    </Form.Item>
                    <Form.Item
                      label="Description"
                      name="description"
                      showValidateSuccess
                      style={{ marginTop: 16 }}
                    >
                      <TextArea
                        name="description"
                        placeholder="Describe The Issue"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Vacating Date"
                      name="date"
                      showValidateSuccess
                      style={{ marginTop: 16 }}
                    >
                      <DatePicker
                        style={{ color: 'red' }}
                        dateRender={current => {
                          const style = {};
                          if (current.date() === 1) {
                            style.border = '1px solid #1890ff';
                            style.borderRadius = '50%';
                          }
                          return (
                            <div
                              className="ant-picker-cell-inner"
                              style={style}
                            >
                              {current.date()}
                            </div>
                          );
                        }}
                        onChange={onSpecialDateChange}
                        disabled={value !== 'Vacate'}
                        name="date"
                        placeholder="Vacate Before"
                      />
                    </Form.Item>
                    <SubmitButton>Send</SubmitButton>
                  </Form>
                )}
              </Formik>
            </Modal>
            <Modal
              centered
              visible={comm.visible}
              onOk={() =>
                setComm({
                  ...comm,
                  visible: false,
                  to: '',
                  recepient: '',
                  agent: '',
                  type: '',
                })
              }
              onCancel={() =>
                setComm({
                  ...comm,
                  visible: false,
                  to: '',
                  recepient: '',
                  agent: '',
                  type: '',
                })
              }
              footer={null}
            >
              <Divider orientation="left">{comm.type}</Divider>

              <Inpu
                required
                type="text"
                name="text"
                value={text}
                onChange={handleCommChange}
                placeholder="Type Message"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
              {comm.type === 'SMS' ? (
                <Button
                  type="primary"
                  size="small"
                  style={{ margin: 5 }}
                  onClick={sendText}
                >
                  Send SMS
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="small"
                  style={{ margin: 5 }}
                  onClick={sendMail}
                >
                  Send Email
                </Button>
              )}
            </Modal>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={0}
            >
              <Grid item xs>
                <ProfileCard
                  id={id}
                  icon={identity }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ContentCard
                  id={id}
                  requestMoveOut={() => doRequestMoveOut(id)}
                  cancelRequestMoveOut={() => doCancelReqMove(id)}
                  moveoutRequested={moveoutRequested}
                  removeUser={() => doRemoveUser(id)}
                  sendSpecialNotice={() => setVisible(true)}
                  meterNo={meterNo}
                  type={type}
                  rent={rent}
                  floor={floor}
                  sendEmail={() =>
                    setComm({
                      ...comm,
                      visible: true,
                      // data: {
                      to: unit.user.email,
                      recepient: unit.user._id,
                      agent: unit.user.agency,
                      // },
                      type: 'Email',
                    })
                  }
                  sendSms={() =>
                    setComm({
                      ...comm,
                      visible: true,
                      // data: {
                      to: unit.user.phone,
                      recepient: unit.user._id,
                      agent: unit.user.agency,
                      // },
                      type: 'SMS',
                    })
                  }
                  features={features.map(feature => (
                    <Chip label={feature} />
                  ))}
                  bills={bills.map(bill => (
                    <Chip label={bill} />
                  ))}
                />
              </Grid>
              <Grid item xs>
                <PaymentCard
                  mode={unit.payment.mode}
                  accNo={unit.payment.accountNumber}
                  accName={unit.payment.accountName}
                  bank={unit.payment.bank}
                  branch={unit.payment.branch}
                  instructions={unit.payment.paydescription}
                />
              </Grid>
            </Grid>

            <UnitTabs
              child0={
                <List
                  bordered
                  itemLayout="vertical"
                  // dataSource={alerts}
                  renderItem={item => (
                    <List.Item key={item._id}>
                      <List.Item.Meta
                        title={<a>{item.topic}</a>} //eslint-disable-line
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              }
              child1={
                <List
                  grid={{ gutter: 16, column: 4 }}
                  itemLayout="horizontal"
                  // size="small"
                  dataSource={unit.notices}
                  renderItem={item => (
                    <Card title={item.date} extra={[<h4>Notice</h4>]}>
                      <List
                        // size="small"
                        // header={<div>{item.date}</div>}
                        dataSource={item.rules}
                        renderItem={ite => <h5>{ite.rule}</h5>}
                      />
                    </Card>
                  )}
                />
              }
              child2={
                <List
                  bordered
                  itemLayout="vertical"
                  dataSource={contacts}
                  renderItem={item => (
                    <List.Item key={item._id} actions={[]}>
                      <List.Item.Meta
                        title={item.name}
                        description={item.station}
                      />
                      <div>
                        {item.contacts.map(contact => (
                          <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="baseline"
                            spacing={0}
                          >
                            <Grid item xs={6}>
                              {contact.name}
                            </Grid>
                            <Grid item xs={6}>
                              {contact.phone}
                            </Grid>
                          </Grid>
                        ))}
                      </div>
                    </List.Item>
                  )}
                />
              }
              child3={
                <List
                  bordered
                  itemLayout="vertical"
                  dataSource={contacts}
                  renderItem={item => (
                    <List.Item key={item._id} actions={[]}>
                      <List.Item.Meta
                        title={item.name}
                        description={item.station}
                      />
                      <div>
                        {item.contacts.map(contact => (
                          <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="baseline"
                            // spacing={0}
                          >
                            <Grid item xs={6}>
                              {contact.name}
                            </Grid>
                            <Grid item xs={6}>
                              {contact.phone}
                            </Grid>
                          </Grid>
                        ))}
                      </div>
                    </List.Item>
                  )}
                />
              }
            />
          </Content>

      </Layout>
    </div>
  );
}

Unit.propTypes = {
  doGetUnit: PropTypes.func,
  doRequestMoveOut: PropTypes.func,
  doSendSpecialNotice: PropTypes.func,
  doCancelReqMove: PropTypes.func,
  doSendEmail: PropTypes.func,
  doRemoveUser: PropTypes.func,
  doSendSMS: PropTypes.func,
  unit: PropTypes.object,
  notices: PropTypes.node,
  contacts: PropTypes.node,
  alerts: PropTypes.node,
  chatrooms: PropTypes.node,
  requests: PropTypes.node,
  receipts: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  unit: makeSelectUnit(),
  notices: makeSelectNotices(),
  contacts: makeSelectContacts(),
  alerts: makeSelectAlerts(),
  chatrooms: makeSelectChatrooms(),
  requests: makeSelectRequests(),
  receipts: makeSelectReceipts(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetUnit: id => dispatch(getUnit(id)),
    doRequestMoveOut: id => dispatch(requestMoveOut(id)),
    doSendSpecialNotice: data => dispatch(sendNotice(data)),
    doCancelReqMove: id => dispatch(cancelReqMove(id)),
    doSendEmail: data => dispatch(sendEmail(data)),
    doSendSMS: data => dispatch(sendSms(data)),
    doRemoveUser: id => dispatch(removeTenant(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Unit);
