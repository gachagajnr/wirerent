/*
 *
 * BuildingMassEmails reducer
 *
 */
import produce from 'immer';
import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  GET_B_EMAILS,
  GET_B_EMAILS_SUCCESS,
  GET_B_EMAILS_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: '',
  data: '',
  emails: [],
  id: '',
  email: '',
};
/* eslint-disable default-case, no-param-reassign */
const buildingMassEmailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SEND_EMAIL:
        draft.data = action.data;
        draft.loading = true;
        break;
      case SEND_EMAIL_SUCCESS:
        draft.emails.push(action.email);
        draft.email = action.email;
        draft.loading = false;
        draft.error = '';
        break;
      case SEND_EMAIL_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case GET_B_EMAILS:
        draft.id = action.id;
        draft.loading = true;
        break;
      case GET_B_EMAILS_SUCCESS:
        draft.emails = action.emails;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_B_EMAILS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default buildingMassEmailsReducer;
