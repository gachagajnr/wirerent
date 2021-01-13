import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newAgencyAdmin state domain
 */

const selectNewAgencyAdminDomain = state =>
  state.newAgencyAdmin || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewAgencyAdmin
 */

const makeSelectNewAgencyAdmin = () =>
  createSelector(
    selectNewAgencyAdminDomain,
    substate => substate,
  );

export default makeSelectNewAgencyAdmin;
export { selectNewAgencyAdminDomain };
