/*
 *
 * BuildingAdmins reducer
 *
 */
import produce from 'immer';
import {
  GET_B_ADMINS,
  GET_B_ADMINS_SUCCESS,
  GET_B_ADMINS_ERROR,
  CREATE_B_ADMIN,
  CREATE_B_ADMIN_SUCCESS,
  CREATE_B_ADMIN_ERROR,
} from './constants';

export const initialState = {
  b_admins: [],
  loading: false,
  error: '',
  b_admin: '',
  id: '',
};
/* eslint-disable default-case, no-param-reassign */
const buildingAdminsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_B_ADMINS:
        draft.id = action.id;
        draft.loading = true;
        break;
      case GET_B_ADMINS_SUCCESS:
        draft.b_admins = action.b_admins;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_B_ADMINS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case CREATE_B_ADMIN:
        draft.data = action.data;
        draft.loading = true;
        break;
      case CREATE_B_ADMIN_SUCCESS:
        draft.b_admins.push(action.b_admin);
        draft.loading = false;
        draft.error = '';
        break;
      case CREATE_B_ADMIN_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default buildingAdminsReducer;
