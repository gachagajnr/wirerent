import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the requestDetails state domain
 */

const selectRequestDetailsDomain = state =>
  state.requestDetails || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RequestDetails
 */

const makeSelectRequestDetails = () =>
  createSelector(
    selectRequestDetailsDomain,
    substate => substate.request,
  );

export { selectRequestDetailsDomain, makeSelectRequestDetails };
