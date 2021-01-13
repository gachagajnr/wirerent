/*
 *
 * UnitRequests reducer
 *
 */
import produce from 'immer';
import {
  CREATE_REQUEST,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_ERROR,
  GET_REQUESTS,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_ERROR,
  CANCEL_REQUEST,
  CANCEL_REQUEST_SUCCESS,
  CANCEL_REQUEST_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  request: '',
  data: '',
  id: '',
  error: '',
  requests: [],
};

/* eslint-disable default-case, no-param-reassign */
const unitRequestsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_REQUEST:
        draft.data = action.data;
        draft.loading = true;
        break;
      case CREATE_REQUEST_SUCCESS:
        draft.requests.push(action.request);
        draft.loading = false;
        draft.error = '';
        break;
      case CREATE_REQUEST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case GET_REQUESTS:
        draft.id = action.id;
        draft.loading = true;
        break;
      case GET_REQUESTS_SUCCESS:
        draft.requests = action.requests;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_REQUESTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case CANCEL_REQUEST:
        draft.data = action.data;
        draft.loading = true;
        break;
      case CANCEL_REQUEST_SUCCESS:
        draft.request = action.request;
        draft.loading = false;
        draft.error = '';
        break;
      case CANCEL_REQUEST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default unitRequestsReducer;
