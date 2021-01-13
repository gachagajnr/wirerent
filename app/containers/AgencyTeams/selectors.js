import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agencyTeams state domain
 */

const selectAgencyTeamsDomain = state => state.agencyTeams || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AgencyTeams
 */

const makeSelectAgencyTeams = () =>
  createSelector(
    selectAgencyTeamsDomain,
    substate => substate.a_teams,
  );

export { selectAgencyTeamsDomain, makeSelectAgencyTeams };
