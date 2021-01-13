/**
 *
 * VerifySignUp
 *
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { Button, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { AuthContext } from 'utils/AuthContext';

export function VerifySignUp() {
  const location = useLocation();
  const va = queryString.parse(location.search);

  const { verifySignup } = useContext(AuthContext);

  return (
    <div>
      <Helmet>
        <title>VerifySignUp</title>
        <meta name="description" content="Description of VerifySignUp" />
      </Helmet>
      <Result
        icon={<SmileOutlined />}
        title="Great, Click The Verify Email Button Below To Verify Your Account!"
        subTitle="This Page is Because You Have Signed Up to Pecker with Your Email Address"
        extra={
          <Button
            type="primary"
            color="green"
            onClick={() => verifySignup(va.token)}
          >
            Verify Email
          </Button>
        }
      />
    </div>
  );
}

VerifySignUp.propTypes = {
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

export default compose(withConnect)(VerifySignUp);
