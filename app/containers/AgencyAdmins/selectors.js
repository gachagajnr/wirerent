import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agencyAdmins state domain
 */

const selectAgencyAdminsDomain = state => state.agencyAdmins || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AgencyAdmins
 */

const makeSelectAgencyAdmins = () =>
  createSelector(
    selectAgencyAdminsDomain,
    substate => substate.a_admins,
  );

export { selectAgencyAdminsDomain, makeSelectAgencyAdmins };
