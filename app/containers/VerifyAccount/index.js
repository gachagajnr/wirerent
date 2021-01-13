/**
 *
 * VerifyAccount
 *
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Result, Button } from 'antd';
import { AuthContext } from 'utils/AuthContext';
export function VerifyAccount() {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <Helmet>
        <title>VerifyAccount</title>
        <meta name="description" content="Description of VerifyAccount" />
      </Helmet>
      <Result
        status="warning"
        title="You need to verify your Account.Check Your Email for the Link We Sent
        and Verify Your Account"
        extra={
          <Button type="primary" key="console" onClick={() => logout()}>
            Exit App
          </Button>
        }
      />
      ,
    </div>
  );
}

VerifyAccount.propTypes = {
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

export default compose(withConnect)(VerifyAccount);
