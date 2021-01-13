/*
 *
 * BuildingNotices reducer
 *
 */
import produce from 'immer';
import {
  GET_B_NOTICES,
  GET_B_NOTICES_SUCCESS,
  GET_B_NOTICES_ERROR,
  CREATE_B_NOTICE,
  CREATE_B_NOTICE_SUCCESS,
  CREATE_B_NOTICE_ERROR,
} from './constants';

export const initialState = {
  b_notices: [],
  loading: false,
  error: '',
  b_notice: '',
  id: '',
};
/* eslint-disable default-case, no-param-reassign */
const buildingNoticesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_B_NOTICES:
        draft.id = action.id;
        draft.loading = true;
        break;
      case GET_B_NOTICES_SUCCESS:
        draft.b_notices = action.b_notices;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_B_NOTICES_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case CREATE_B_NOTICE:
        draft.data = action.data;
        draft.loading = true;
        break;
      case CREATE_B_NOTICE_SUCCESS:
        draft.b_notices.push(action.b_notice);
        draft.loading = false;
        draft.error = '';
        break;
      case CREATE_B_NOTICE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default buildingNoticesReducer;
