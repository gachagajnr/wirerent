/*
 *
 * RequestDetails reducer
 *
 */
import produce from 'immer';
import {
  GET_REQUEST,
  GET_REQUEST_SUCCESS,
  GET_REQUEST_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: '',
  id: '',
  request: {},
};

/* eslint-disable default-case, no-param-reassign */
const requestDetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_REQUEST:
        draft.loading = true;
        draft.id = action.id;
        break;
      case GET_REQUEST_SUCCESS:
        draft.loading = false;
        draft.error = '';
        draft.request = action.request;
        break;
      case GET_REQUEST_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default requestDetailsReducer;
