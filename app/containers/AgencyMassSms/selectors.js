import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agencyMassSms state domain
 */

const selectAgencyMassSmsDomain = state => state.agencyMassSms || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AgencyMassSms
 */

const makeSelectAgencyMassSms = () =>
  createSelector(
    selectAgencyMassSmsDomain,
    substate => substate.smses,
  );

export { selectAgencyMassSmsDomain, makeSelectAgencyMassSms };
