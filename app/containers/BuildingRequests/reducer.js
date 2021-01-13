/*
 *
 * BuildingRequests reducer
 *
 */
import produce from 'immer';
import {
  GET_B_REQUESTS,
  GET_B_REQUESTS_SUCCESS,
  GET_B_REQUESTS_ERROR,
} from './constants';

export const initialState = {
  b_requests: [],
  loading: false,
  error: '',
  id: '',
};
/* eslint-disable default-case, no-param-reassign */
const buildingRequestsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_B_REQUESTS:
        draft.id = action.id;
        draft.loading = true;
        break;
      case GET_B_REQUESTS_SUCCESS:
        draft.b_requests = action.b_requests;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_B_REQUESTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default buildingRequestsReducer;
