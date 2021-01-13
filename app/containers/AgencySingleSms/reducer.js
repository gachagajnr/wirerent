import { GET_SMS, GET_SMS_ERROR, GET_SMS_SUCCESS } from './constants';

import { message } from 'antd';
/*
 *
 * AgencySingleSms reducer
 *
 */
import produce from 'immer';

export const initialState = {
  sms: [],
  loading: false,
  error: '',
  id: '',
};

/* eslint-disable default-case, no-param-reassign */
const agencySingleSmsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_SMS:
        draft.id = action.id;
        draft.error = '';
        draft.loading = true;
        break;
      case GET_SMS_SUCCESS:
        draft.sms = action.sms;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_SMS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        message.error('An Error Occured, Refresh')
        break;
    }
  });

export default agencySingleSmsReducer;
