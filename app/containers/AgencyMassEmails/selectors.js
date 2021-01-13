import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agencyMassEmails state domain
 */

const selectAgencyMassEmailsDomain = state =>
  state.agencyMassEmails || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AgencyMassEmails
 */

const makeSelectAgencyMassEmails = () =>
  createSelector(
    selectAgencyMassEmailsDomain,
    substate => substate.emails,
  );

export { selectAgencyMassEmailsDomain, makeSelectAgencyMassEmails };
