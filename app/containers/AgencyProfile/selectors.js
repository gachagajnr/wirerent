import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agencyProfile state domain
 */

const selectAgencyProfileDomain = state => state.agencyProfile || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AgencyProfile
 */

const makeSelectAgencyProfile = () =>
  createSelector(
    selectAgencyProfileDomain,
    substate => substate,
  );

export { selectAgencyProfileDomain, makeSelectAgencyProfile };
