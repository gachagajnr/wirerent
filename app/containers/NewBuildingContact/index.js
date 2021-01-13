/**
 *
 * NewBuildingContact
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
import { Layout, Typography, Tag, Divider, Button } from 'antd';
import Grid from '@material-ui/core/Grid';
import { Formik, FieldArray } from 'formik';
import { Input, Form, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';
import GlobalHeader from 'containers/GlobalHeader/index';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createB_Contact } from 'containers/BuildingContacts/actions';
import reducer from 'containers/BuildingContacts/reducer';
import saga from 'containers/BuildingContacts/saga';
import makeSelectNewBuildingContact from './selectors';
import messages from './messages';
const { Content, Header } = Layout;

const ContactsSchema = Yup.object().shape({
  contacts: Yup.string().required(' Definitions are Required'),
  name: Yup.string().required(' Name is Required'),
});
export function NewBuildingContact({ doCreateBContact }) {
  useInjectReducer({ key: 'buildingContacts', reducer });
  useInjectSaga({ key: 'buildingContacts', saga });
  const { id } = useParams();
  const history = useHistory();

  return (
    <div>
      <Helmet>
        <title>NewBuildingContact</title>
        <meta
          name="description"
          content="Description of NewBuildingContact"
        />
      </Helmet>
      <Layout>
        <Header
          className="site-layout-background"
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',

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
                New Contact
              </Typography>
              <Tag color="magenta" style={{ marginLeft: 5 }}>
                Building
              </Tag>
            </Grid>

            <Grid item xs={4} />
          </Grid>
        </Header>
        <GlobalHeader
          title="Add Building Contact"
          className="site-page-header"
          extra={[

          ]}
        />
        <Content style={{ marginTop: 55 }}>
          <Formik
            initialValues={{
              building: id,
              name: '',
              station: '',
              contacts: [],
            }}
            validationSchema={ContactsSchema}
            onSubmit={(values, actions) => {
              // createTeam(values);
              doCreateBContact(values);
              actions.setSubmitting(false);
            }}
          >
            {({ isSubmitting, values, touched }) => (
              <Form size="middle">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Form.Item label="Name" name="name" showValidateSuccess>
                      <Input
                        name="name"
                        placeholder="e.g Fire, Security, G4S"
                      />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Form.Item
                      label="Station(Optional)"
                      name="station"
                      showValidateSuccess
                    >
                      <Input name="station" placeholder="Serving Station" />
                    </Form.Item>
                  </Grid>

                  <Divider orientation="left">Hotlines</Divider>
                  <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <FieldArray
                      name="contacts"
                      render={arrayHelpers => (
                        <div style={{ textAlign: 'center' }}>
                          {values.contacts &&
                            values.contacts.length > 0 &&
                            values.contacts.map((friend, index) => (
                              <div
                                key={index}
                                style={{ textAlign: 'center' }}
                              >
                                <Grid container>
                                  <Grid item xs={12} md={6}>
                                    <Input
                                      name={`contacts.${index}.name`}
                                      placeholder="Hotline Title"
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Input
                                      name={`contacts.${index}.phone`}
                                      placeholder=" Phone Number"
                                      addonBefore="+254"
                                    />
                                  </Grid>

                                  <Grid item xs>
                                    <MinusOutlined
                                      style={{ color: 'red' }}
                                      onClick={() =>
                                        arrayHelpers.remove(index)
                                      }
                                    />

                                    <PlusOutlined
                                      style={{ color: 'green' }}
                                      onClick={() =>
                                        arrayHelpers.insert(index, '')
                                      }
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
                              Add Hotline Numbers
                            </Button>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </Grid>
                <SubmitButton style={{ marginTop: 16 }}>Save</SubmitButton>
              </Form>
            )}
          </Formik>
        </Content>
      </Layout>
    </div>
  );
}

NewBuildingContact.propTypes = {
  doCreateBContact: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  newBuildingContact: makeSelectNewBuildingContact(),
});

function mapDispatchToProps(dispatch) {
  return {
    doCreateBContact: data => dispatch(createB_Contact(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewBuildingContact);
