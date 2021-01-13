import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the buildingMassSms state domain
 */

const selectBuildingMassSmsDomain = state =>
  state.buildingMassSms || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BuildingMassSms
 */

const makeSelectBuildingMassSms = () =>
  createSelector(
    selectBuildingMassSmsDomain,
    substate => substate.smses,
  );

export { selectBuildingMassSmsDomain, makeSelectBuildingMassSms };
