import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addNewAgencyTeam state domain
 */

const selectAddNewAgencyTeamDomain = state =>
  state.addNewAgencyTeam || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddNewAgencyTeam
 */

const makeSelectAddNewAgencyTeam = () =>
  createSelector(
    selectAddNewAgencyTeamDomain,
    substate => substate,
  );

export default makeSelectAddNewAgencyTeam;
export { selectAddNewAgencyTeamDomain };
