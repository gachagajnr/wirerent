/**
 *
 * RequestRoom
 *
 */

import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Result, Space } from 'antd';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import { Input, Form, SubmitButton, Select } from 'formik-antd';
import * as Yup from 'yup';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { AuthContext } from 'utils/AuthContext';
import { makeSelectRequestRoom } from './selectors';
import { createRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
// import app from 'utils/api'

const codeSchema = Yup.object().shape({
  code: Yup.string().required('Please enter the Building Code'),
});

export function RequestRoom({ doCreateRequest }) {
  useInjectReducer({ key: 'requestRoom', reducer });
  useInjectSaga({ key: 'requestRoom', saga });
  const { user } = useContext(AuthContext);
  // app.io.on('add-requests patched',function(event){

  // })
  return (
    <div>
      <Helmet>
        <title>RequestRoom</title>
        <meta name="description" content="Description of RequestRoom" />
      </Helmet>
      <Result
        status="warning"
        title={`Welcome To ${user.user.organization_name}`}
        subTitle="Kindly Enter Your Building Code to Request The Landlord to Assign You Your Respective Room."
        extra={[
          <Space direction="horizontal">
            <Formik
              initialValues={{
                code: '',
                // tenant: user.user.id,
              }}
              validationSchema={codeSchema}
              onSubmit={(values, actions) => {
                doCreateRequest(values);
                // alert(JSON.stringify(values));
                actions.setSubmitting(false);
              }}
            >
              {({ isSubmitting,   touched }) => (
                <Form size="middle" type="vertical">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>

                      <Form.Item label="" name="code" showValidateSuccess>
                        <Input name="code" placeholder="Building Code" />
                      </Form.Item>
                    </Grid>
                  </Grid>
                  <SubmitButton>Request Add</SubmitButton>
                </Form>
              )}
            </Formik>
          </Space>,
        ]}
      />
      ,
    </div>
  );
}

RequestRoom.propTypes = {
  doCreateRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  requestRoom: makeSelectRequestRoom(),
});

function mapDispatchToProps(dispatch) {
  return {
    doCreateRequest: data => dispatch(createRequest(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RequestRoom);
