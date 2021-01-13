/*
 *
 * Tenants reducer
 *
 */
import produce from 'immer';
import {
  GET_TENANTS,
  GET_TENANTS_SUCCESS,
  GET_TENANTS_ERROR,
  SEND_SMS,
  SEND_SMS_SUCCESS,
  SEND_SMS_ERROR,
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  organization: '',
  tenants: [],
  error: '',
  data: '',
  email: '',
  sms: '',
};

/* eslint-disable default-case, no-param-reassign */
const tenantsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_TENANTS:
        draft.organization = action.organization;
        draft.loading = true;
        break;
      case GET_TENANTS_SUCCESS:
        draft.tenants = action.tenants;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_TENANTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case SEND_EMAIL:
        draft.data = action.data;
        draft.loading = true;
        break;
      case SEND_EMAIL_SUCCESS:
        draft.email = action.email;
        draft.loading = false;
        draft.error = '';
        break;
      case SEND_EMAIL_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case SEND_SMS:
        draft.data = action.data;
        draft.loading = true;
        break;
      case SEND_SMS_SUCCESS:
        draft.sms = action.sms;
        draft.loading = false;
        draft.error = '';
        break;
      case SEND_SMS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default tenantsReducer;
