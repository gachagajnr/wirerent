import {
  FLAG_REQUEST,
  FLAG_REQUEST_ERROR,
  FLAG_REQUEST_SUCCESS,
  GET_REQUESTS,
  GET_REQUESTS_ERROR,
  GET_REQUESTS_SUCCESS,
} from './constants';

import { notification } from 'antd';
/*
 *
 * AddRequests reducer
 *
 */
import produce from 'immer';

export const initialState = {
  loading: false,
  error: '',
  id: '',
  add_requests: [],
  req: '',
  request: '',
};

/* eslint-disable default-case, no-param-reassign */
const addRequestsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FLAG_REQUEST:
        draft.req = action.req;
        draft.loading = true;
        break;
      case FLAG_REQUEST_SUCCESS:
        draft.request = action.request;
        draft.loading = false;
        draft.error = '';
        break;
      case FLAG_REQUEST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case GET_REQUESTS:
        draft.id = action.id;
        draft.loading = true;

        break;
      case GET_REQUESTS_SUCCESS:
        draft.add_requests = action.add_requests;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_REQUESTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default addRequestsReducer;
