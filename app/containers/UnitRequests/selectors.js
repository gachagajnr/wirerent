import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the unitRequests state domain
 */

const selectUnitRequestsDomain = state => state.unitRequests || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UnitRequests
 */

const makeSelectUnitRequests = () =>
  createSelector(
    selectUnitRequestsDomain,
    substate => substate.requests,
  );

// export default makeSelectUnitRequests;
export { selectUnitRequestsDomain, makeSelectUnitRequests };
