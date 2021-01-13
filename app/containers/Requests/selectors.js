import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the requests state domain
 */

const selectRequestsDomain = state => state.requests || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Requests
 */

const makeSelectRequests = () =>
  createSelector(
    selectRequestsDomain,
    substate => substate.requests,
  );

export { selectRequestsDomain, makeSelectRequests };
