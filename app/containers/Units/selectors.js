import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the units state domain
 */

const selectUnitsDomain = state => state.units || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Units
 */

const makeSelectUnits = () =>
  createSelector(
    selectUnitsDomain,
    substate => substate.units,
  );

export { selectUnitsDomain, makeSelectUnits };
