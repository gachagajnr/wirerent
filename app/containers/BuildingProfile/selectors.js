import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the buildingProfile state domain
 */

const selectBuildingProfileDomain = state =>
  state.buildingProfile || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BuildingProfile
 */

const makeSelectBuildingProfile = () =>
  createSelector(
    selectBuildingProfileDomain,
    substate => substate,
  );

export default makeSelectBuildingProfile;
export { selectBuildingProfileDomain };
