import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newBuilding state domain
 */

const selectNewBuildingDomain = state => state.newBuilding || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewBuilding
 */

const makeSelectNewBuilding = () =>
  createSelector(
    selectNewBuildingDomain,
    substate => substate,
  );

export default makeSelectNewBuilding;
export { selectNewBuildingDomain };
