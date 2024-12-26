/**
 *
 * UnitRequests
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import moment from 'moment'
import * as Yup from 'yup';
import { useParams, useHistory } from 'react-router-dom';
import {
  Tag,
  Button,
  List,
  Modal,
  Menu,
  Dropdown,
  Layout,
  Input as Inpu,
  Typography,
  Tooltip,
  Space,
  Divider,
} from 'antd';
import Grid from '@material-ui/core/Grid';
import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import { Form, Input, SubmitButton, Radio, DatePicker } from 'formik-antd';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectUBName,
  makeSelectUnitIdentity,
} from 'containers/Unit/selectors';
import GlobalHeader from 'containers/GlobalHeader/index';

import Can from 'utils/Can';
import { makeSelectUnitRequests } from './selectors';
import { createRequest, getRequests, cancelRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { TextArea } = Input;
const { Header, Content } = Layout;

const RequestSchema = Yup.object().shape({
  value: Yup.string().required('Required'),
  description: Yup.string().required(' Description is Required'),
  date: Yup.string(),
  // rules: Yup.string().required(' Team Name is Required'),
});
export function UnitRequests({
  requests,
  building_name,
  identity,
  doCreateRequest,
  doGetRequests,
  doCancelRequest,
}) {
  useInjectReducer({ key: 'unitRequests', reducer });
  useInjectSaga({ key: 'unitRequests', saga });
  const history = useHistory();
  const { id } = useParams();
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [pvisible, setPvisible] = useState({
    id: '',
    visible: false,
  });
  const [reason, setReason] = useState('');

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    doGetRequests(id);
  }, []);

  function onChange(e) {
    setValue(e.target.value);
    // e.preventDefault()
  }
  // console.log(value);
  function setModalVisible() {
    setVisible(true);
  }
  function onDateChange(e, dateString) {
    setDate(dateString);
  }

  function handleReasonChange(e) {
    setReason(e.target.value);
    e.preventDefault();
  }
  function cancelMyRequest() {
    const req = { id: pvisible.id, reason };
    doCancelRequest(req);
  }

  return (
    <div>
      <Helmet>
        <title>UnitRequests</title>
        <meta name="description" content="Description of UnitRequests" />
      </Helmet>
      <Layout className="site-layout">
        <GlobalHeader
          color="#77815c"
          title={`${identity} ${building_name} Requests`}
          // role={user.user.role}
          other={[]}
          className="site-page-header"
          extra={[
            <Tooltip title="New Request">
              <Can do="read" on="TenantMenu" field="tenant">
                <Button size="small" onClick={() => setModalVisible()}>
                  New Request
                </Button>
              </Can>
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
            <Divider orientation="left">Choose From Below</Divider>

            <Formik
              initialValues={{
                value,
                description: '',
                date,
                room: id,
                action: 'request',
              }}
              validationSchema={RequestSchema}
              onSubmit={(values, actions) => {
                doCreateRequest(values);
                actions.resetForm();
                // alert(JSON.stringify(values));
              }}
            >
              {({ isSubmitting, touched }) => (
                <Form>
                  <Radio.Group
                    name="value"
                    defaultValue="Plumber"
                    value={value}
                    onChange={onChange}
                  >
                    <Radio value="Plumber">
                      <Tag color="green">Plumber</Tag>
                    </Radio>
                    <Radio value="Electrician">
                      <Tag color="cyan">Electrician</Tag>
                    </Radio>
                    <Radio value="TV/Satellite/Internet">
                      <Tag color="indigo">TV/Satellite/Internet</Tag>
                    </Radio>
                    <Radio value="Meter/TokenProblem">
                      <Tag color="magenta">Meter/TokenProblem</Tag>
                    </Radio>

                    <Radio value="Water">
                      <Tag color="blue">Water</Tag>
                    </Radio>
                  </Radio.Group>
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

                  <SubmitButton>Submit</SubmitButton>
                </Form>
              )}
            </Formik>
          </Modal>
          <Modal
            title="Reason For Cancelling"
            visible={pvisible.visible}
            onOk={() => setPvisible({ id: '', visible: false })}
            onCancel={() => setPvisible({ id: '', visible: false })}
          >
            <Space direction="horizontal">
              <Inpu
                required
                placeholder="Reason"
                onChange={handleReasonChange}
              />
              <Button
                type="primary"
                disabled={!reason}
                onClick={cancelMyRequest}
              >
                Submit
              </Button>
            </Space>
          </Modal>

          <List
            bordered
            className="demo-loadmore-list"
            // loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={requests}
            renderItem={item => (
              <List.Item
                actions={[
                  <a href="/#" key="list-loadmore-edit">
                    {moment(item.createdAt).format('MMM Do YY')}
                  </a>,
                  <Dropdown
                    key="uman"
                    overlay={
                      <Menu>
                        <Menu.Item key={10}>
                          <Tooltip title="Mark As Done">
                            <Button
                              type="primary"
                              size="small"
                              // onClick={() => setCam(true)}
                            >
                              Mark Done
                            </Button>
                          </Tooltip>
                        </Menu.Item>

                        <Menu.Item key={109}>
                          <Can do="read" on="TenantMenu" field="tenant">
                            <Button
                              type="danger"
                              size="small"
                              onClick={() =>
                                setPvisible({
                                  id: item._id,
                                  visible: true,
                                })
                              }
                              disabled={
                                item.completed === 'Cancelled' ||
                                item.completed === 'Flagged Down' ||
                                item.completed === 'Approved'
                              }
                            >
                              Cancel Request
                            </Button>
                          </Can>
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <a
                      href="/#"
                      className="ant-dropdown-link"
                      onClick={e => e.preventDefault()}
                    >
                      Actions <DownOutlined />
                    </a>
                  </Dropdown>,
                ]}
              >
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.requested}</a>}
                  description={item.description}
                />
                <div>
                  <Tag color={item.completed ? 'green' : 'red'}>
                    {item.completed}
                  </Tag>
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

UnitRequests.propTypes = {
  doGetRequests: PropTypes.func,
  doCreateRequest: PropTypes.func,
  doCancelRequest: PropTypes.func,
  building_name: PropTypes.string,
  identity: PropTypes.string,
  requests: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  // unitRequests: makeSelectUnitRequests(),
  requests: makeSelectUnitRequests(),
  building_name: makeSelectUBName(),
  identity: makeSelectUnitIdentity(),
});

function mapDispatchToProps(dispatch) {
  return {
    doCreateRequest: data => dispatch(createRequest(data)),
    doGetRequests: id => dispatch(getRequests(id)),
    doCancelRequest: data => dispatch(cancelRequest(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UnitRequests);
