import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the buildingContacts state domain
 */

const selectBuildingContactsDomain = state =>
  state.buildingContacts || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BuildingContacts
 */

const makeSelectBuildingContacts = () =>
  createSelector(
    selectBuildingContactsDomain,
    substate => substate.b_contacts,
  );

export { selectBuildingContactsDomain, makeSelectBuildingContacts };
