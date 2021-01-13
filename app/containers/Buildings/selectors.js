import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the buildings state domain
 */

const selectBuildingsDomain = state => state.buildings || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Buildings
 */

const makeSelectBuildings = () =>
  createSelector(
    selectBuildingsDomain,
    substate => substate.buildings,
  );

export { selectBuildingsDomain, makeSelectBuildings };
