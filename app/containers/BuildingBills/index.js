/**
 *
 * BuildingBills
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
import makeSelectBuildingBills from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function BuildingBills() {
  useInjectReducer({ key: 'buildingBills', reducer });
  useInjectSaga({ key: 'buildingBills', saga });

  return (
    <div>
      <Helmet>
        <title>BuildingBills</title>
        <meta name="description" content="Description of BuildingBills" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

BuildingBills.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  buildingBills: makeSelectBuildingBills(),
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
)(BuildingBills);
