/*
 *
 * Agencies reducer
 *
 */
import produce from 'immer';
import {
  GET_AGENCIES,
  GET_AGENCIES_SUCCESS,
  GET_AGENCIES_ERROR,
} from './constants';

export const initialState = {
  agencies: [],
  loading: false,
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const agenciesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_AGENCIES:
        draft.loading = true;
        break;
      case GET_AGENCIES_SUCCESS:
        draft.loading = false;
        draft.agencies = action.agencies;
        draft.error = '';
        break;
      case GET_AGENCIES_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default agenciesReducer;
