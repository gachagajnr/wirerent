import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newBuildingAdmin state domain
 */

const selectNewBuildingAdminDomain = state =>
  state.newBuildingAdmin || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewBuildingAdmin
 */

const makeSelectNewBuildingAdmin = () =>
  createSelector(
    selectNewBuildingAdminDomain,
    substate => substate,
  );

export default makeSelectNewBuildingAdmin;
export { selectNewBuildingAdminDomain };
