import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newUnit state domain
 */

const selectNewUnitDomain = state => state.newUnit || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewUnit
 */

const makeSelectNewUnit = () =>
  createSelector(
    selectNewUnitDomain,
    substate => substate,
  );

export { selectNewUnitDomain, makeSelectNewUnit };
