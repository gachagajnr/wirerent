import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agencies state domain
 */

const selectAgenciesDomain = state => state.agencies || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Agencies
 */

const makeSelectAgencies = () =>
  createSelector(
    selectAgenciesDomain,
    substate => substate.agencies,
  );

export default makeSelectAgencies;
export { selectAgenciesDomain };
