/**
 *
 * RequestDetails
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useParams } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectRequestDetails } from './selectors';
import { getRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function RequestDetails({ doGetRequest, request }) {
  useInjectReducer({ key: 'requestDetails', reducer });
  useInjectSaga({ key: 'requestDetails', saga });
  const { id } = useParams();
  useEffect(() => {
    doGetRequest(id);
  }, []);
  return (
    <div>
      <Helmet>
        <title>RequestDetails</title>
        <meta name="description" content="Description of RequestDetails" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

RequestDetails.propTypes = {
  doGetRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  request: makeSelectRequestDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetRequest: id => dispatch(getRequest(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RequestDetails);
