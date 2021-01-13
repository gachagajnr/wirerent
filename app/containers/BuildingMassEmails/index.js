/**
 *
 * BuildingMassEmails
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import * as Yup from 'yup';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button,
  Typography,
  List,
  Modal,
  Layout,
  Divider,
  Dropdown,
  Tag,
  Menu,
  Space,
} from 'antd';
import Grid from '@material-ui/core/Grid';
import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectName } from 'containers/Building/selectors';
import GlobalHeader from 'containers/GlobalHeader/index';

import { makeSelectBuildingMassEmails } from './selectors';
import { sendEmail, getBEmails } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
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
export function BuildingMassEmails({
  emails,
  doSendEmail,
  name,
  doGetMassEmails,
}) {
  useInjectReducer({ key: 'buildingMassEmails', reducer });
  useInjectSaga({ key: 'buildingMassEmails', saga });
  const history = useHistory();
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState('small');

  useEffect(() => {
    doGetMassEmails(id);
  }, []);

  function setModalVisible() {
    setVisible(true);
  }
  return (
    <div>
      <Helmet>
        <title>BuildingMassEmails</title>
        <meta
          name="description"
          content="Description of BuildingMassEmails"
        />
      </Helmet>
      <Layout className="site-layout">
        <GlobalHeader
          color="#77815c"
          title={`${name} Mass Emails`}
          // role={user.user.role}
          other={[
            <Space>
              <Tag color="warning" icon={<ExclamationCircleOutlined />}>
                Total
              </Tag>
              <Text type="danger">{emails.length}</Text>
            </Space>,
          ]}
          className="site-page-header"
          extra={[
            <Button
              size="small"
              type="primary"
              onClick={() => setModalVisible()}
            >
              Send Mass Emails
            </Button>,
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item onClick={e => setSize('small')}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      // href="http://www.alipay.com/"
                    >
                      Small
                    </a>
                  </Menu.Item>
                  <Menu.Item onClick={e => setSize('default')}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      // href="http://www.taobao.com/"
                    >
                      Default
                    </a>
                  </Menu.Item>
                  <Menu.Item onClick={e => setSize('large')}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      // href="http://www.taobao.com/"
                    >
                      Large
                    </a>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomRight"
            >
              <Button size="small">List Size</Button>
            </Dropdown>,
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
                building: id,
              }}
              validationSchema={EmailSchema}
              onSubmit={(values, actions) => {
                doSendEmail(values);
                actions.resetForm();
                // alert(JSON.stringify(values));
              }}
            >
              {({ isSubmitting, touched }) => (
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
            itemLayout="horizontal"
            // loadMore={loadMore}
            size={size}
            bordered
            dataSource={emails}
            renderItem={item => (
              <List.Item actions={[<h5>{item.createdAt}</h5>]}>
                <List.Item.Meta
                  title={
                    <Typography variant="caption">{item.title}</Typography>
                  }
                  description={
                    <Typography variant="subtitle2">
                      {item.message}
                    </Typography>
                  }
                />
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </div>
  );
}

BuildingMassEmails.propTypes = {
  doGetMassEmails: PropTypes.func,
  emails: PropTypes.array,
  name: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  emails: makeSelectBuildingMassEmails(),
  name: makeSelectName(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetMassEmails: id => dispatch(getBEmails(id)),
    doSendEmail: data => dispatch(sendEmail(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BuildingMassEmails);
