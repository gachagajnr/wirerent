/**
 *
 * AgencyMassSms
 *
 */

import * as Yup from 'yup';

import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Layout,
  List,
  Menu,
  Modal,
  Row,Space,
  Tag,Tooltip,
  Typography,
} from 'antd';
import { Form, Input, SubmitButton } from 'formik-antd';
import React, { memo, useContext, useEffect, useState } from 'react';
import { createSMS, deleteSMS, getSMSs } from './actions';
import { useHistory, useParams } from 'react-router-dom';

import { AuthContext } from 'utils/AuthContext';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import app from 'utils/api';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAgencyMassSms } from './selectors';
import messages from './messages';
import moment from 'moment';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import GlobalHeader from 'containers/GlobalHeader/index'

const { TextArea } = Input;
const { Header, Content } = Layout;
const { Text } = Typography;

const SMSSchema = Yup.object().shape({
  title: Yup.string().required('Title is Required'),
  message: Yup.string()
    .min(5, 'Message Too Short')
    .max(50, 'Exceeded Message Limit')
    .required(' Message is Required'),
  // rules: Yup.string().required(' Team Name is Required'),
  // rules: Yup.string().required(' Team Name is Required'),
});
export function AgencyMassSms({ doSendSMS, smses, doDeleteSms, doGetSmses }) {
  useInjectReducer({ key: 'agencyMassSms', reducer });
  useInjectSaga({ key: 'agencyMassSms', saga });
  const history = useHistory();
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    doGetSmses(user.user.organization);
  }, []);
  app.io.on('mass-sms created', function(data) {
    doGetSmses(user.user.organization);
  });
  app.io.on('mass-sms patched', function(data) {
    doGetSmses(user.user.organization);
  });
  app.io.on('mass-sms removed', function(data) {
    doGetSmses(user.user.organization);
  });
  function setModalVisible() {
    setVisible(true);
  }
  return (
    <div>
      <Helmet>
        <title>AgencyMassSms</title>
        <meta name="description" content="Description of AgencyMassSms" />
      </Helmet>
      <Layout className="site-layout">
        <GlobalHeader
          title="Agency Mass Sms"
          role={user.user.role}
          other={
            <Space>
              <Tag color="success">Total</Tag>
              <Text type="danger">{smses.length}</Text>
            </Space>
          }
          className="site-page-header"
          extra={[
            <Tooltip title="Send SMS Broadcast">
              <Button
                size="small"
                type="primary"
                onClick={() => setModalVisible()}
              >
                Send New Mass SMS
              </Button>
            </Tooltip>,
          ]}
        />

        <Content style={{ marginTop: 55 }}>
          <Modal
            // title="20px to Top"
            style={{ top: 20 }}
            visible={visible}
            centered
            footer={null}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
          >
            <Divider orientation="left">Mass Broadcast</Divider>

            <Formik
              initialValues={{
                title: '',
                message: '',
                agent: user.user.organization,
              }}
              validationSchema={SMSSchema}
              onSubmit={(values, actions) => {
                doSendSMS(values);
                actions.resetForm();
                // alert(JSON.stringify(values));
              }}
            >
              {({ isSubmitting,   touched }) => (
                <Form>
                  <Form.Item
                    label="Title"
                    name="title"
                    showValidateSuccess
                    style={{ marginTop: 16 }}
                  >
                    <Input name="title" placeholder="SMS Title" />

                  </Form.Item>
                  <Form.Item
                    label="Message"
                    name="message"
                    showValidateSuccess
                    style={{ marginTop: 16 }}
                  >
                    <TextArea
                      name="message"
                      placeholder="Message Content"
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />

                  </Form.Item>
                  <SubmitButton>Send</SubmitButton>
                </Form>
              )}
            </Formik>
          </Modal>
          <List
            header={<div>Agency SMS Broadcasts</div>}
            itemLayout="horizontal"
            size="small"
            bordered
            dataSource={smses}
            renderItem={item => (
              <List.Item
                actions={[
                  <Tag>{moment(item.createdAt).format('MMM Do YY')}</Tag>,
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <Button
                            type="primary"
                            size="small"
                            onClick={() =>
                              doSendSMS({
                                message: item.message,
                                agent: item.organization,
                                title: item.title,
                              })
                            }
                          >
                            Resend
                          </Button>
                        </Menu.Item>

                        <Menu.Item>
                          <Button
                            type="danger"
                            size="small"
                            onClick={() => doDeleteSms(item._id)}
                          >
                            Delete
                          </Button>
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <a
                      className="ant-dropdown-link"
                      onClick={e => e.preventDefault()}
                    >
                      Action <DownOutlined />
                    </a>
                  </Dropdown>,
                ]}
              >
                <List.Item.Meta
                  title={<Text mark>{item.title}</Text>}
                  description={
                    <Typography variant="subtitle2">
                      {item.message}
                    </Typography>
                  }
                />
                <div>
                  <h5>
                    {moment(item.createdAt).fromNow(item.createdAt)} ago
                  </h5>
                </div>
                {/* </Skeleton> */}
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </div>
  );
}

AgencyMassSms.propTypes = {
  doSendSMS: PropTypes.func,
  doDeleteSms: PropTypes.func,
  doGetSmses: PropTypes.func,
  smses: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  smses: makeSelectAgencyMassSms(),
});

function mapDispatchToProps(dispatch) {
  return {
    doSendSMS: data => dispatch(createSMS(data)),
    doDeleteSms: rec => dispatch(deleteSMS(rec)),

    doGetSmses: id => dispatch(getSMSs(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AgencyMassSms);
