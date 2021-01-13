import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the buildingTenants state domain
 */

const selectBuildingTenantsDomain = state =>
  state.buildingTenants || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BuildingTenants
 */

const makeSelectBuildingTenants = () =>
  createSelector(
    selectBuildingTenantsDomain,
    substate => substate.tenants,
  );

export { selectBuildingTenantsDomain, makeSelectBuildingTenants };
