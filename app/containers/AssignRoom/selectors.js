import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the assignRoom state domain
 */

const selectAssignRoomDomain = state => state.assignRoom || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AssignRoom
 */

const makeSelectAssignRoom = () =>
  createSelector(
    selectAssignRoomDomain,
    substate => substate,
  );
const makeSelectBuildings = () =>
  createSelector(
    selectAssignRoomDomain,
    substate => substate.buildings,
  );

export { selectAssignRoomDomain, makeSelectAssignRoom, makeSelectBuildings };
