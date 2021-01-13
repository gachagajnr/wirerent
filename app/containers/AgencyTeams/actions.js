/*
 *
 * AgencyTeams actions
 *
 */

import {
  GET_A_TEAMS,
  GET_A_TEAMS_SUCCESS,
  GET_A_TEAMS_ERROR,
  CREATE_A_TEAM,
  CREATE_A_TEAM_SUCCESS,
  CREATE_A_TEAM_ERROR,
} from './constants';

export function getA_Teams(id) {
  return {
    type: GET_A_TEAMS,
    id,
  };
}

export function getA_TeamsSuccess(a_teams) {
  return {
    type: GET_A_TEAMS_SUCCESS,
    a_teams,
  };
}
export function getA_TeamsError(error) {
  return {
    type: GET_A_TEAMS_ERROR,
    error,
  };
}

export function createA_Team(data) {
  return {
    type: CREATE_A_TEAM,
    data,
  };
}

export function createA_TeamSuccess(a_team) {
  return {
    type: CREATE_A_TEAM_SUCCESS,
    a_team,
  };
}
export function createA_TeamError(error) {
  return {
    type: CREATE_A_TEAM_ERROR,
    error,
  };
}
