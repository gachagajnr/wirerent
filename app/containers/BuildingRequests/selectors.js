import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the buildingRequests state domain
 */

const selectBuildingRequestsDomain = state =>
  state.buildingRequests || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BuildingRequests
 */

const makeSelectBuildingRequests = () =>
  createSelector(
    selectBuildingRequestsDomain,
    substate => substate.b_requests,
  );
const makeSelectTeams = () =>
  createSelector(
    selectBuildingRequestsDomain,
    substate => substate.b_requests.teams,
  );

export {
  selectBuildingRequestsDomain,
  makeSelectBuildingRequests,
  makeSelectTeams,
};
