/**
 *
 * AgencyNotices
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAgencyNotices from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function AgencyNotices() {
  useInjectReducer({ key: 'agencyNotices', reducer });
  useInjectSaga({ key: 'agencyNotices', saga });

  return (
    <div>
      <Helmet>
        <title>AgencyNotices</title>
        <meta name="description" content="Description of AgencyNotices" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

AgencyNotices.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  agencyNotices: makeSelectAgencyNotices(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AgencyNotices);
