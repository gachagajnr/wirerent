import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addNewBuildingNotice state domain
 */

const selectAddNewBuildingNoticeDomain = state =>
  state.addNewBuildingNotice || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddNewBuildingNotice
 */

const makeSelectAddNewBuildingNotice = () =>
  createSelector(
    selectAddNewBuildingNoticeDomain,
    substate => substate,
  );

export default makeSelectAddNewBuildingNotice;
export { selectAddNewBuildingNoticeDomain };
