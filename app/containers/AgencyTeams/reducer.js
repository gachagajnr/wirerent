import {
  CREATE_A_TEAM,
  CREATE_A_TEAM_ERROR,
  CREATE_A_TEAM_SUCCESS,
  GET_A_TEAMS,
  GET_A_TEAMS_ERROR,
  GET_A_TEAMS_SUCCESS,
} from './constants';

import { message } from 'antd';
/*
 *
 * AgencyTeams reducer
 *
 */
import produce from 'immer';

export const initialState = {
  a_teams: [],
  loading: false,
  error: '',
  id: '',
  data: '',
  a_team: '',
};
/* eslint-disable default-case, no-param-reassign */
const agencyTeamsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_A_TEAMS:
        draft.id = action.id;
        draft.loading = true;
        break;
      case GET_A_TEAMS_SUCCESS:
        draft.a_teams = action.a_teams;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_A_TEAMS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case CREATE_A_TEAM:
        draft.data = action.data;
        draft.loading = true;
        break;
      case CREATE_A_TEAM_SUCCESS:
        draft.a_teams.push(action.a_team);
        draft.loading = false;
        draft.error = '';
        message.success('Team Created Successfully')
        break;
      case CREATE_A_TEAM_ERROR:
        draft.error = action.error;
        draft.loading = false;
        message.error('Team Creation Failed')
        break;
    }
  });

export default agencyTeamsReducer;
