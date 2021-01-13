/**
 *
 * AddNewBuildingNotice
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
import {
  MinusOutlined,
  PlusOutlined,
  DownOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Layout, Tag, Divider, Button, Avatar } from 'antd';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import { Formik, FieldArray } from 'formik';
import { Input, Form, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createB_Notice } from 'containers/BuildingNotices/actions';
import {
  makeSelectName,
  makeSelectBuilding,
} from 'containers/Building/selectors';
import { getCurrentDate } from 'utils/showTodayDate';
import makeSelectAddNewBuildingNotice from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
const { Content, Header } = Layout;
const { TextArea } = Input;

const RulesSchema = Yup.object().shape({
  rules: Yup.string().required(' Definitions are Required'),
});

export function AddNewBuildingNotice({ doCreateBNotice, name, building }) {
  useInjectReducer({ key: 'addNewBuildingNotice', reducer });
  useInjectSaga({ key: 'addNewBuildingNotice', saga });
  const { id } = useParams();
  const history = useHistory();
  const today = getCurrentDate();
  return (
    <div>
      <Helmet>
        <title>AddNewBuildingNotice</title>
        <meta
          name="description"
          content="Description of AddNewBuildingNotice"
        />
      </Helmet>
      <Layout>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              position: 'fixed',
              zIndex: 1,
              width: '100%',
              marginTop: 10,
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
                  New Notice
                </Typography>
                <Tag color="magenta" style={{ marginLeft: 5 }}>
                  Building
                </Tag>
              </Grid>

              <Grid item xs={4} />
            </Grid>
          </Header>

          <Content style={{ marginTop: 90, padding: 20 }}>
            <Formik
              initialValues={{
                date: today,
                building: id,
                rules: [],
              }}
              validationSchema={RulesSchema}
              onSubmit={(values, actions) => {
                doCreateBNotice(values);
                actions.setSubmitting(false);
                actions.resetForm();

                // alert(JSON.stringify(values));
              }}
            >
              {({ isSubmitting, values,   touched }) => (
                <Paper style={{ padding: 16 }}>
                  <Form size="middle">
                    <Grid container spacing={2}>
                      <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="flex-start"
                      >
                        <Grid item xs={3}>
                          <Avatar
                            style={{ backgroundColor: '#001529' }}
                            shape="square"
                            size={64}
                          >
                            {name.toUpperCase().match(/\b(\w)/g)}
                          </Avatar>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography
                            style={{ color: '#000' }}
                            variant="h6"
                            display="block"
                          >
                            {'| '}
                            {name}
                          </Typography>

                          <Typography variant="subtitle2">
                            {'| '}
                            {building.street}
                          </Typography>
                          <Typography variant="subtitle2" display="block">
                            {'| '}
                            {building.location}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Divider plain orientation="right">
                        {'Date: '}
                        <Tag color="red">{today}</Tag>
                      </Divider>

                      <Divider orientation="left">Dear Tenants</Divider>
                      <div
                        style={{
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          width: '100%',
                        }}
                      >
                        <FieldArray
                          name="rules"
                          render={arrayHelpers => (
                            <div style={{ textAlign: 'center' }}>
                              {values.rules &&
                                values.rules.length > 0 &&
                                values.rules.map((friend, index) => (
                                  <div key={index}>
                                    <Grid container spacing={1}>
                                      <Grid item xs={9}>
                                        <TextArea
                                          name={`rules.${index}.rule`}
                                          placeholder=" Type A Rule Description"
                                          allowClear
                                          autoSize={{
                                            minRows: 2,
                                            maxRows: 6,
                                          }}
                                        />
                                      </Grid>
                                      <Grid item xs={3}>
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
                              <div style={{ margin: 5 }}>
                                <Button
                                  type="default"
                                  icon={
                                    <DownOutlined style={{ color: 'green' }} />
                                  }
                                  onClick={() => arrayHelpers.push('')}
                                >
                                  Add New Rule
                                </Button>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    </Grid>
                    <SubmitButton style={{ marginTop: 16 }}>
                      Publish
                    </SubmitButton>
                  </Form>
                </Paper>
              )}
            </Formik>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

AddNewBuildingNotice.propTypes = {
  doCreateBNotice: PropTypes.func,
  name: PropTypes.string,
  building: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  addNewBuildingNotice: makeSelectAddNewBuildingNotice(),
  name: makeSelectName(),
  building: makeSelectBuilding(),
});

function mapDispatchToProps(dispatch) {
  return {
    doCreateBNotice: data => dispatch(createB_Notice(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddNewBuildingNotice);
