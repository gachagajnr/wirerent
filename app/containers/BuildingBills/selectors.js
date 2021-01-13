import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the buildingBills state domain
 */

const selectBuildingBillsDomain = state => state.buildingBills || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BuildingBills
 */

const makeSelectBuildingBills = () =>
  createSelector(
    selectBuildingBillsDomain,
    substate => substate,
  );

export default makeSelectBuildingBills;
export { selectBuildingBillsDomain };
