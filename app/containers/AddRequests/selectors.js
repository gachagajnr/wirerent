import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addRequests state domain
 */

const selectAddRequestsDomain = state => state.addRequests || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddRequests
 */

const makeSelectAddRequests = () =>
  createSelector(
    selectAddRequestsDomain,
    substate => substate.add_requests,
  );

export { selectAddRequestsDomain, makeSelectAddRequests };
