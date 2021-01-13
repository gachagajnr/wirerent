import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tenant state domain
 */

const selectTenantDomain = state => state.tenant || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Tenant
 */

const makeSelectTenant = () =>
  createSelector(
    selectTenantDomain,
    substate => substate,
  );

export default makeSelectTenant;
export { selectTenantDomain };
