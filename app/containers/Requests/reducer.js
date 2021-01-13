/*
 *
 * Requests reducer
 *
 */
import produce from 'immer';
import {
  GET_REQUESTS,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_ERROR,
  ASSIGN_TASK,
  ASSIGN_TASK_SUCCESS,
  ASSIGN_TASK_ERROR,
} from './constants';

export const initialState = {
  organization: '',
  error: '',
  requests: '',
  loading: false,
  task: '',
  data: '',
};

/* eslint-disable default-case, no-param-reassign */
const requestsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_REQUESTS:
        draft.organization = action.organization;
        draft.loading = true;
        break;
      case GET_REQUESTS_SUCCESS:
        draft.requests = action.requests;
        draft.loading = false;
        break;
      case GET_REQUESTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case ASSIGN_TASK:
        draft.data = action.data;
        draft.loading = true;
        break;
      case ASSIGN_TASK_SUCCESS:
        draft.task = action.task;
        draft.loading = false;
        break;
      case ASSIGN_TASK_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default requestsReducer;
