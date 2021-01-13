import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agencySingleEmails state domain
 */

const selectAgencySingleEmailsDomain = state =>
  state.agencySingleEmails || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AgencySingleEmails
 */

const makeSelectAgencySingleEmails = () =>
  createSelector(
    selectAgencySingleEmailsDomain,
    substate => substate.emails,
  );

 export { selectAgencySingleEmailsDomain, makeSelectAgencySingleEmails };
