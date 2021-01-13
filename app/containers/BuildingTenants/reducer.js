import {
  GET_TENANTS,
  GET_TENANTS_ERROR,
  GET_TENANTS_SUCCESS,
  SEND_EMAIL,
  SEND_EMAIL_ERROR,
  SEND_EMAIL_SUCCESS,
  SEND_SMS,
  SEND_SMS_ERROR,
  SEND_SMS_SUCCESS,
} from './constants';

/*
 *
 * BuildingTenants reducer
 *
 */
import produce from 'immer';

export const initialState = {
         loading: false,
         id: '',
         tenants: [],
         error: '',
         data: '',
         email: '',
         sms: '',
       };
/* eslint-disable default-case, no-param-reassign */
const buildingTenantsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_TENANTS:
        draft.id = action.id;
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

export default buildingTenantsReducer;
