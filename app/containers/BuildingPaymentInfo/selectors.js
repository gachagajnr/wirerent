import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the buildingPaymentInfo state domain
 */

const selectBuildingPaymentInfoDomain = state =>
  state.buildingPaymentInfo || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BuildingPaymentInfo
 */

const makeSelectBuildingPaymentInfo = () =>
  createSelector(
    selectBuildingPaymentInfoDomain,
    substate => substate.payinfo,
  );

export { selectBuildingPaymentInfoDomain, makeSelectBuildingPaymentInfo };
