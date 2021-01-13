import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the assignTenant state domain
 */

const selectAssignTenantDomain = state => state.assignTenant || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AssignTenant
 */

const makeSelectAssignTenant = () =>
  createSelector(
    selectAssignTenantDomain,
    substate => substate,
  );

export default makeSelectAssignTenant;
export { selectAssignTenantDomain };
