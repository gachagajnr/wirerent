/**
 *
 * RegisterSuccess
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
export function RegisterSuccess(props) {
  const { state } = props.location;

  return (
    <div>
      <Helmet>
        <title>RegisterSuccess</title>
        <meta name="description" content="Description of RegisterSuccess" />
      </Helmet>
      <Result
        status="success"
        title={`${state.detail} `}
        subTitle="Account with the above Email was created successfully.
      We Sent An Activation Link to Your Mail,Click Link In Email To Verify Your Account, It may appear after a few minutes"
        extra={[
          <Link to="/login" key={88}>
            <Button type="link">Back To Login</Button>
          </Link>,
        ]}
      />
    </div>
  );
}

RegisterSuccess.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(RegisterSuccess);
