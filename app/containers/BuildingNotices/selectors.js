import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the buildingNotices state domain
 */

const selectBuildingNoticesDomain = state =>
  state.buildingNotices || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BuildingNotices
 */

const makeSelectBuildingNotices = () =>
  createSelector(
    selectBuildingNoticesDomain,
    substate => substate.b_notices,
  );

export { selectBuildingNoticesDomain, makeSelectBuildingNotices };
