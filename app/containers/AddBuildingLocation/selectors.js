import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addBuildingLocation state domain
 */

const selectAddBuildingLocationDomain = state =>
  state.addBuildingLocation || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddBuildingLocation
 */

const makeSelectAddBuildingLocation = () =>
  createSelector(
    selectAddBuildingLocationDomain,
    substate => substate,
  );

export default makeSelectAddBuildingLocation;
export { selectAddBuildingLocationDomain };
