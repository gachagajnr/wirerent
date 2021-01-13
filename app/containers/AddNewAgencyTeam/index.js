/**
 *
 * AddNewAgencyTeam
 *
 */

import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useHistory, useParams } from 'react-router-dom';
import {
  MinusOutlined,
  PlusOutlined,
  DownOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Layout, Tag, Divider, Typography, Button } from 'antd';
import GlobalHeader from 'containers/GlobalHeader/index';

import Grid from '@material-ui/core/Grid';
import { Formik, FieldArray } from 'formik';
import { Input, Form, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { AuthContext } from 'utils/AuthContext';

import { createA_Team } from 'containers/AgencyTeams/actions';
import reducer from 'containers/AgencyTeams/reducer';
import saga from 'containers/AgencyTeams/saga';
import makeSelectAddNewAgencyTeam from './selectors';
import messages from './messages';
const { Header, Content } = Layout;

const AgencyTeamSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, 'Team Name Too Short!')

    .required(' Team Name is Required'),
  leader_name: Yup.string().required('Leader Name is Required'),
  leader_email: Yup.string()
    .email('Invalid email')
    .required('Email Address is Required'),
  leader_phone: Yup.number('Must be a valid Phone Number').required(
    'Leader Phone is Required',
  ),
});
export function AddNewAgencyTeam({ doCreateA_Team }) {
  useInjectReducer({ key: 'agencyTeams', reducer });
  useInjectSaga({ key: 'agencyTeams', saga });
  const history = useHistory();
  const { user } = useContext(AuthContext);
  // const { id } = useParams();
  return (
    <div>
      <Helmet>
        <title>AddNewAgencyTeam</title>
        <meta name="description" content="Description of AddNewAgencyTeam" />
      </Helmet>
      <Layout>
        <GlobalHeader
          color="#77815c"
          title="Create Agency Team"
          // role={user.user.role}
          other={[]}
          className="site-page-header"
          extra={[

          ]}
        />
        <Layout className="site-layout">
          <Content style={{ marginTop: 55 }}>
            <Formik
              initialValues={{
                agent: user.user.organization,
                name: '',
                leader_name: '',
                leader_email: '',
                leader_phone: '',
                members: [],
              }}
              validationSchema={AgencyTeamSchema}
              onSubmit={(values, actions) => {
                doCreateA_Team(values);
                actions.setSubmitting(false);

                // alert(JSON.stringify(values));
              }}
            >
              {({ isSubmitting, values, touched }) => (
                <Form size="middle">
                  <Grid container spacing={2}>
                    <Divider orientation="left">Expertise Field</Divider>

                    <Grid item xs={12} sm={6}>
                      <Form.Item
                        label="Team Expertise"
                        name="name"
                        showValidateSuccess
                      >
                        <Input
                          name="name"
                          placeholder="e.g Plumbing, Electrician, Carpentry"
                        />
                      </Form.Item>
                    </Grid>
                    <Divider orientation="left">Team Leader</Divider>
                    <Grid item xs={12} sm={6} md={4}>
                      <Form.Item
                        label="Full Name"
                        name="leader_name"
                        showValidateSuccess
                      >
                        <Input name="leader_name" placeholder="Full Name" />
                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Form.Item
                        label="Email Address"
                        name="leader_email"
                        showValidateSuccess
                      >
                        <Input
                          name="leader_email"
                          placeholder="Email Address"
                        />
                      </Form.Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Form.Item
                        label="Phone"
                        name="leader_phone"
                        showValidateSuccess
                      >
                        <Input name="leader_phone" placeholder="Phone" />
                      </Form.Item>
                    </Grid>
                    <Divider orientation="left">Members</Divider>
                    <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                      <FieldArray
                        name="members"
                        render={arrayHelpers => (
                          <div style={{ textAlign: 'center' }}>
                            {values.members &&
                              values.members.length > 0 &&
                              values.members.map((friend, index) => (
                                <div
                                  key={index}
                                  style={{ textAlign: 'center' }}
                                >
                                  <Grid container spacing={2}>
                                    <Grid item xs>
                                      <Input
                                        name={`members.${index}.name`}
                                        placeholder=" Full Name"
                                      />
                                    </Grid>
                                    <Grid item xs>
                                      <Input
                                        name={`members.${index}.phone`}
                                        placeholder=" Phone"
                                        addonBefore="+254"
                                      />
                                    </Grid>
                                    <Grid item xs>
                                      <Input
                                        name={`members.${index}.email`}
                                        placeholder=" Email"
                                      />
                                    </Grid>
                                    <Grid item xs>
                                      <Button
                                        icon={
                                          <MinusOutlined
                                            style={{ color: 'red' }}
                                          />
                                        }
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        } // remove a friend from the list
                                      />

                                      <Button
                                        icon={
                                          <PlusOutlined
                                            style={{ color: 'green' }}
                                          />
                                        }
                                        onClick={() =>
                                          arrayHelpers.insert(index, '')
                                        } // insert an empty string at a position
                                      />
                                    </Grid>
                                  </Grid>
                                </div>
                              ))}
                            {/* Add a new empty item at the end of the list */}
                            <div style={{ marginTop: 5 }}>
                              <Button
                                type="default"
                                icon={
                                  <DownOutlined style={{ color: 'green' }} />
                                }
                                onClick={() => arrayHelpers.push('')}
                              >
                                Add Member Fields
                              </Button>
                            </div>
                          </div>
                        )}
                      />
                    </div>
                  </Grid>
                  <SubmitButton style={{ marginTop: 16 }}  >
                    Create Team
                  </SubmitButton>
                </Form>
              )}
            </Formik>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

AddNewAgencyTeam.propTypes = {
  doCreateA_Team: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  addNewAgencyTeam: makeSelectAddNewAgencyTeam(),
});

function mapDispatchToProps(dispatch) {
  return {
    doCreateA_Team: data => dispatch(createA_Team(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddNewAgencyTeam);
