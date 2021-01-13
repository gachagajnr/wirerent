import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addBuildingPaymentInfo state domain
 */

const selectAddBuildingPaymentInfoDomain = state =>
  state.addBuildingPaymentInfo || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddBuildingPaymentInfo
 */

const makeSelectAddBuildingPaymentInfo = () =>
  createSelector(
    selectAddBuildingPaymentInfoDomain,
    substate => substate,
  );

export default makeSelectAddBuildingPaymentInfo;
export { selectAddBuildingPaymentInfoDomain };
