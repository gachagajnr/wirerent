import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tenants state domain
 */

const selectTenantsDomain = state => state.tenants || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Tenants
 */

const makeSelectTenants = () =>
  createSelector(
    selectTenantsDomain,
    substate => substate.tenants,
  );

export { selectTenantsDomain, makeSelectTenants };
