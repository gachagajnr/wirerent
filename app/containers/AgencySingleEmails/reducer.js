import { GET_EMAILS, GET_EMAILS_ERROR, GET_EMAILS_SUCCESS } from './constants';

import { message } from 'antd';
/*
 *
 * AgencySingleEmails reducer
 *
 */
import produce from 'immer';

export const initialState = {
  id: '',
  loading: false,
  emails: [],
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const agencySingleEmailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_EMAILS:
        draft.id = action.id;
        draft.loading = true;
        draft.error = '';
        break;
      case GET_EMAILS_SUCCESS:
        draft.emails = action.emails;
        draft.loading = false;
        draft.error = '';

        break;
      case GET_EMAILS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        message.error('An Error Occured, Refresh')

        break;
    }
  });

export default agencySingleEmailsReducer;
