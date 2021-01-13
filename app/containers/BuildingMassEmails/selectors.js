import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the buildingMassEmails state domain
 */

const selectBuildingMassEmailsDomain = state =>
  state.buildingMassEmails || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BuildingMassEmails
 */

const makeSelectBuildingMassEmails = () =>
  createSelector(
    selectBuildingMassEmailsDomain,
    substate => substate.emails,
  );

export { selectBuildingMassEmailsDomain, makeSelectBuildingMassEmails };
