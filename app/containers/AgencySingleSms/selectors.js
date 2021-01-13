import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agencySingleSms state domain
 */

const selectAgencySingleSmsDomain = state =>
  state.agencySingleSms || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AgencySingleSms
 */

const makeSelectAgencySingleSms = () =>
  createSelector(
    selectAgencySingleSmsDomain,
    substate => substate.sms,
  );

export { selectAgencySingleSmsDomain, makeSelectAgencySingleSms };
