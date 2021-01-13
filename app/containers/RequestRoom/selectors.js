import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the requestRoom state domain
 */

const selectRequestRoomDomain = state => state.requestRoom || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RequestRoom
 */

const makeSelectRequestRoom = () =>
  createSelector(
    selectRequestRoomDomain,
    substate => substate.request,
  );

export { selectRequestRoomDomain, makeSelectRequestRoom };
