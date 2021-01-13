import {
  CREATE_EMAIL,
  CREATE_EMAIL_ERROR,
  CREATE_EMAIL_SUCCESS,
  DELETE_EMAIL,
  DELETE_EMAIL_ERROR,
  DELETE_EMAIL_SUCCESS,
  GET_EMAILS,
  GET_EMAILS_ERROR,
  GET_EMAILS_SUCCESS,
} from './constants';

import { notification } from 'antd';
/*
 *
 * AgencyMassEmails reducer
 *
 */
import produce from 'immer';

export const initialState = {
  loading: false,
  email: '',
  emails: [],
  error: '',
  id: '',
  rec: '',
};

/* eslint-disable default-case, no-param-reassign */
const agencyMassEmailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_EMAIL:
        draft.data = action.data;
        draft.loading = true;
        break;
      case CREATE_EMAIL_SUCCESS:
        draft.emails.push(action.email);
        draft.email = action.email;
        draft.loading = false;
        draft.error = '';
        notification.success({
          message: 'Mass Email',
          description: 'Email Created Successfully.',
          duration: 2,
          key: 'mass-emails-add-succ',
        });
        break;
      case CREATE_EMAIL_ERROR:
        draft.error = action.error;
        draft.loading = false;
        notification.error({
          message: 'Mass Email',
          description: 'Email Sending Failed.',
          duration: 2,
          key: 'mass-emails-add-err',
        });
        break;
      case GET_EMAILS:
        draft.id = action.id;
        draft.loading = true;
        break;
      case GET_EMAILS_SUCCESS:
        draft.emails = action.emails;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_EMAILS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case DELETE_EMAIL:
        draft.rec = action.rec;
        draft.loading = true;
        break;
      case DELETE_EMAIL_SUCCESS:
        // draft.emails.splice(action.email._id);
        draft.email = action.email;
        draft.loading = false;
        draft.error = '';
        notification.success({
          message: 'Mass Email',
          description: 'Email Deleted Successfully.',
          duration: 2,
          key: 'mass-emails-del',
        });
        break;
      case DELETE_EMAIL_ERROR:
        draft.error = action.error;
        draft.loading = false;
        notification.error({
          message: 'Mass Email',
          description: 'Email Deletion Failed',
          duration: 2,
          key: 'mass-emails-del-err',
        });
        break;
    }
  });

export default agencyMassEmailsReducer;
