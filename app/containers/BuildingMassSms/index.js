/**
 *
 * BuildingMassSms
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import moment from 'moment';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useParams, useHistory } from 'react-router-dom';
import {
  Button,
  List,
  Modal,
  Layout,
  Divider,
  Typography,
  Dropdown,
  Menu,
  Space,
  Tag,
} from 'antd';
import Grid from '@material-ui/core/Grid';
import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import GlobalHeader from 'containers/GlobalHeader/index';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectName } from 'containers/Building/selectors';
import { makeSelectBuildingMassSms } from './selectors';
import { sendSms, getBSms } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const { TextArea } = Input;
const { Header, Content } = Layout;
const { Text } = Typography;

const SMSSchema = Yup.object().shape({
  title: Yup.string().required('Title is Required'),
  message: Yup.string().required(' Message is Required'),
  // rules: Yup.string().required(' Team Name is Required'),
  // rules: Yup.string().required(' Team Name is Required'),
});
export function BuildingMassSms({ smses,name, doSendBMassSMS, doGetBSms }) {
  useInjectReducer({ key: 'buildingMassSms', reducer });
  useInjectSaga({ key: 'buildingMassSms', saga });
  const history = useHistory();
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState('small');

  useEffect(() => {
    doGetBSms(id);
  }, []);

  function setModalVisible() {
    setVisible(true);
  }

  return (
    <div>
      <Helmet>
        <title>BuildingMassSms</title>
        <meta name="description" content="Description of BuildingMassSms" />
      </Helmet>
      <Layout className="site-layout">
        <GlobalHeader
          color="#77815c"
          title={`${name} Mass SMS`}
          // role={user.user.role}
          other={[
            <Space>
              <Tag color="warning" icon={<ExclamationCircleOutlined />}>
                Total
              </Tag>
              <Text type="danger">{smses.length}</Text>
            </Space>,
          ]}
          className="site-page-header"
          extra={[
            <Button
              size="small"
              type="primary"
              onClick={() => setModalVisible()}
            >
              Send Mass SMS
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
              validationSchema={SMSSchema}
              onSubmit={(values, actions) => {
                doSendBMassSMS(values);
                actions.setSubmitting(false);
                actions.resetForm();
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
            size={size}
            itemLayout="horizontal"
            // loadMore={loadMore}
            bordered
            dataSource={smses}
            renderItem={item => (
              <List.Item actions={[<h5>{item.createdAt}</h5>]}>
                <List.Item.Meta
                  title={
                    <Typography variant="caption">{item.title}</Typography>
                  }
                  description={
                    <Typography variant="subtitle2">{item.message}</Typography>
                  }
                />
                <div>
                  <h5>{moment(item.createdAt).fromNow(item.createdAt)} ago</h5>
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

BuildingMassSms.propTypes = {
  doSendBMassSMS: PropTypes.func,
  doGetBSms: PropTypes.func,
  smses: PropTypes.array,
  name: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  smses: makeSelectBuildingMassSms(),
  name: makeSelectName(),
});

function mapDispatchToProps(dispatch) {
  return {
    doSendBMassSMS: data => dispatch(sendSms(data)),
    doGetBSms: id => dispatch(getBSms(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BuildingMassSms);
