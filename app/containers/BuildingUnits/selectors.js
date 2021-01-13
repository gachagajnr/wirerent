import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the buildingUnits state domain
 */

const selectBuildingUnitsDomain = state => state.buildingUnits || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BuildingUnits
 */

const makeSelectBuildingUnits = () =>
  createSelector(
    selectBuildingUnitsDomain,
    substate => substate.units,
  );

export { selectBuildingUnitsDomain, makeSelectBuildingUnits };
