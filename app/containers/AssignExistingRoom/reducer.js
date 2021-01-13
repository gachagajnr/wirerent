/*
 *
 * AssignExistingRoom reducer
 *
 */
import produce from 'immer';
import {
  GET_ROOMS,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_ERROR,
  ASSIGN_ROOM,
  ASSIGN_ROOM_SUCCESS,
  ASSIGN_ROOM_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: '',
  organization: '',
  rooms: [],
  data: '',
  room: '',
  nroom: '',
};
/* eslint-disable default-case, no-param-reassign */
const assignExistingRoomReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ROOMS:
        draft.organization = action.organization;
        draft.loading = false;
        break;
      case GET_ROOMS_SUCCESS:
        draft.rooms = action.rooms;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_ROOMS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case ASSIGN_ROOM:
        draft.nroom = action.nroom;
        draft.loading = true;
        break;
      case ASSIGN_ROOM_SUCCESS:
        draft.room = action.room;
        draft.loading = false;
        draft.error = '';
        break;
      case ASSIGN_ROOM_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default assignExistingRoomReducer;
