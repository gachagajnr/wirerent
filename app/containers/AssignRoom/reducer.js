/*
 *
 * AssignRoom reducer
 *
 */
import produce from 'immer';
import {
  GET_BUILDINGS,
  GET_BUILDINGS_SUCCESS,
  GET_BUILDINGS_ERROR,
  CREATE_ROOM,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: '',
  organization: '',
  buildings: [],
  data: '',
  room: '',
  nroom: '',
};

/* eslint-disable default-case, no-param-reassign */
const assignRoomReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_BUILDINGS:
        draft.organization = action.organization;
        draft.loading = false;
        break;
      case GET_BUILDINGS_SUCCESS:
        draft.buildings = action.buildings;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_BUILDINGS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case CREATE_ROOM:
        draft.nroom = action.nroom;
        draft.loading = false;
        break;
      case CREATE_ROOM_SUCCESS:
        draft.room = action.room;
        draft.loading = false;
        draft.error = '';
        break;
      case CREATE_ROOM_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default assignRoomReducer;
