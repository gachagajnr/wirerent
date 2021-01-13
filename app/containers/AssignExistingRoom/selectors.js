import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the assignExistingRoom state domain
 */

const selectAssignExistingRoomDomain = state =>
  state.assignExistingRoom || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AssignExistingRoom
 */

const makeSelectAssignExistingRoom = () =>
  createSelector(
    selectAssignExistingRoomDomain,
    substate => substate.rooms,
  );

export { selectAssignExistingRoomDomain, makeSelectAssignExistingRoom };
