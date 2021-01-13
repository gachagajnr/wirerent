/*
 *
 * BuildingMassSms reducer
 *
 */
import produce from 'immer';
import {
  SEND_SMS,
  SEND_SMS_SUCCESS,
  SEND_SMS_ERROR,
  GET_B_SMS,
  GET_B_SMS_SUCCESS,
  GET_B_SMS_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: '',
  data: '',
  smses: '',
  id: '',
  sms: '',
};
/* eslint-disable default-case, no-param-reassign */
const buildingMassSmsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SEND_SMS:
        draft.data = action.data;
        draft.loading = true;
        break;
      case SEND_SMS_SUCCESS:
        draft.smses.push(action.sms);
        draft.sms = action.sms;
        draft.loading = false;
        draft.error = '';
        break;
      case SEND_SMS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case GET_B_SMS:
        draft.id = action.id;
        draft.loading = true;
        break;
      case GET_B_SMS_SUCCESS:
        draft.smses = action.smses;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_B_SMS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default buildingMassSmsReducer;
