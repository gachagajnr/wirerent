/**
 *
 * AgencyMassEmails
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
  Space,

  Tooltip,
  Modal,
  Row,
  Tag,
  Typography,
} from 'antd';
import { Form, Input, SubmitButton } from 'formik-antd';
import React, { memo, useContext, useEffect, useState } from 'react';
import { createEmail, deleteEmail, getEmails } from './actions';
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
import { makeSelectAgencyMassEmails } from './selectors';
import GlobalHeader from 'containers/GlobalHeader/index'
import messages from './messages';
import moment from 'moment';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const { TextArea } = Input;
const { Header, Content } = Layout;
const { Text } = Typography;

const EmailSchema = Yup.object().shape({
  title: Yup.string().required('Title is Required'),
  message: Yup.string()
    .min(5, 'Message Too Short')
    .max(200, 'Exceeded Message Limit')
    .required(' Message is Required'),
  // rules: Yup.string().required(' Team Name is Required'),
  // rules: Yup.string().required(' Team Name is Required'),
});
export function AgencyMassEmails({
  doGetMassEmails,
  emails,
  doDeleteMail,
  doCreateMassEmail,
}) {
  useInjectReducer({ key: 'agencyMassEmails', reducer });
  useInjectSaga({ key: 'agencyMassEmails', saga });
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const { user } = useContext(AuthContext);
  // console.log(app);
  app.io.on('mass-emails created', function(data) {
    doGetMassEmails(user.user.organization);
  });
  app.io.on('mass-emails removed', function(data) {
    doGetMassEmails(user.user.organization);
  });
  useEffect(() => {
    doGetMassEmails(user.user.organization);
  }, []);

  function setModalVisible() {
    setVisible(true);
  }
  // console.log('emails');
  return (
    <div>
      <Helmet>
        <title>AgencyMassEmails</title>
        <meta name="description" content="Description of AgencyMassEmails" />
      </Helmet>
      <Layout className="site-layout">
        <GlobalHeader
          title="Agency Mass Emails"
          role={user.user.role}
          other={
            <Space>
              <Tag color="success">Total</Tag>
              <Text type="danger">{emails.length}</Text>
            </Space>
          }
          className="site-page-header"
          extra={[
            <Tooltip title="Send Email Broadcast">
              <Button
                size="small"
                type="primary"
                onClick={() => setModalVisible()}
              >
                Send New Mass Email
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
            <Divider orientation="left">Content</Divider>

            <Formik
              initialValues={{
                title: '',
                message: '',
                agent: user.user.organization,
              }}
              validationSchema={EmailSchema}
              onSubmit={(values, actions) => {
                doCreateMassEmail(values);
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
            header={<div>Agency Email Broadcasts</div>}
            itemLayout="horizontal"
            size="small"
            bordered
            dataSource={emails}
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
                              doCreateMassEmail({
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
                            onClick={() => doDeleteMail(item._id)}
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
                  description={<p>{item.message}</p>}
                />
                <div>
                  {' '}
                  {moment(item.createdAt).fromNow(item.createdAt)} ago
                </div>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </div>
  );
}

AgencyMassEmails.propTypes = {
  doGetMassEmails: PropTypes.func,
  doDeleteMail: PropTypes.func,
  emails: PropTypes.array,
  doCreateMassEmail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  emails: makeSelectAgencyMassEmails(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetMassEmails: id => dispatch(getEmails(id)),
    doCreateMassEmail: data => dispatch(createEmail(data)),
    doDeleteMail: rec => dispatch(deleteEmail(rec)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AgencyMassEmails);
