import { applyMiddleware } from 'redux';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    substate => substate.user.email,
  );
const makeSelectError = () =>
  createSelector(
    selectGlobal,
    substate => substate.error,
  );
const makeSelectUserName = () =>
  createSelector(
    selectGlobal,
    substate => substate.user,
  );

export {
  makeSelectLocation,
  makeSelectUser,
  makeSelectError,
  makeSelectUserName,
};
