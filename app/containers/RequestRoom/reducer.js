/*
 *
 * RequestRoom reducer
 *
 */
import produce from 'immer';
import {
  CREATE_REQUEST,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_ERROR,
} from './constants';

export const initialState = {
  data: '',
  loading: false,
  error: '',
  request: '',
};

/* eslint-disable default-case, no-param-reassign */
const requestRoomReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_REQUEST:
        draft.data = action.data;
        draft.loading = true;
        break;
      case CREATE_REQUEST_SUCCESS:
        draft.request = action.request;
        draft.loading = false;
        break;
      case CREATE_REQUEST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default requestRoomReducer;
