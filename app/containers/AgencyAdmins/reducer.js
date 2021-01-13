import {
  CREATE_A_ADMIN,
  CREATE_A_ADMIN_ERROR,
  CREATE_A_ADMIN_SUCCESS,
  GET_A_ADMINS,
  GET_A_ADMINS_ERROR,
  GET_A_ADMINS_SUCCESS,
} from './constants';

import { notification } from 'antd';
/*
 *
 * AgencyAdmins reducer
 *
 */
import produce from 'immer';

export const initialState = {
  a_admins: [],
  loading: false,
  error: '',
  a_admin: '',
  id: '',
};
/* eslint-disable default-case, no-param-reassign */
const agencyAdminsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_A_ADMINS:
        draft.id = action.id;
        draft.loading = true;
        break;
      case GET_A_ADMINS_SUCCESS:
        draft.a_admins = action.a_admins;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_A_ADMINS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        notification.error(JSON.stringify(action.error));
        break;
      case CREATE_A_ADMIN:
        draft.data = action.data;
        draft.loading = true;
        break;
      case CREATE_A_ADMIN_SUCCESS:
        draft.a_admins.push(action.a_admin);
        draft.loading = false;
        draft.error = '';
        messsage.success('Admin Created Successfully');
        break;
      case CREATE_A_ADMIN_ERROR:
        draft.error = action.error;
        draft.loading = false;
        notification.error('Admin Creation Failed');
        break;
    }
  });

export default agencyAdminsReducer;
