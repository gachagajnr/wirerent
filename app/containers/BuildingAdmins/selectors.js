import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the buildingAdmins state domain
 */

const selectBuildingAdminsDomain = state =>
  state.buildingAdmins || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BuildingAdmins
 */

const makeSelectBuildingAdmins = () =>
  createSelector(
    selectBuildingAdminsDomain,
    substate => substate.b_admins,
  );

export { selectBuildingAdminsDomain, makeSelectBuildingAdmins };
