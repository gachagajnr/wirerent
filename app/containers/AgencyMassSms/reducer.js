import {
  CREATE_SMS,
  CREATE_SMS_ERROR,
  CREATE_SMS_SUCCESS,
  DELETE_SMS,
  DELETE_SMS_ERROR,
  DELETE_SMS_SUCCESS,
  GET_SMSS,
  GET_SMSS_ERROR,
  GET_SMSS_SUCCESS,
} from './constants';

import { notification } from 'antd';
/*
 *
 * AgencyMassSms reducer
 *
 */
import produce from 'immer';

export const initialState = {
  id: '',
  smses: [],
  sms: '',
  data: '',
  rec: '',
  loading: false,
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const agencyMassSmsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_SMS:
        draft.data = action.data;
        draft.loading = true;
        break;
      case CREATE_SMS_SUCCESS:
        draft.smses.push(action.sms);
        draft.sms = action.sms;
        draft.loading = false;
        draft.error = '';
        notification.success('Sms Created Successfully');
        break;
      case CREATE_SMS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        notification.error('Sms sending failed');
        break;
      case GET_SMSS:
        draft.id = action.id;
        draft.loading = true;
        break;
      case GET_SMSS_SUCCESS:
        draft.smses = action.smses;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_SMSS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case DELETE_SMS:
        draft.rec = action.rec;
        draft.loading = true;
        break;
      case DELETE_SMS_SUCCESS:
        // draft.smses.splice(action.sms._id);
        draft.sms = action.sms;
        draft.loading = false;
        draft.error = '';
        notification.success('Sms deleted Successfully');
        break;
      case DELETE_SMS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        notification.error('Sms deletion Failed');
        break;
    }
  });

export default agencyMassSmsReducer;
