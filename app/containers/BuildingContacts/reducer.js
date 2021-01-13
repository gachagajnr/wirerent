/*
 *
 * BuildingContacts reducer
 *
 */
import produce from 'immer';
import {
  GET_B_CONTACTS,
  GET_B_CONTACTS_SUCCESS,
  GET_B_CONTACTS_ERROR,
  CREATE_B_CONTACT,
  CREATE_B_CONTACT_SUCCESS,
  CREATE_B_CONTACT_ERROR,
} from './constants';

export const initialState = {
  b_contacts: [],
  loading: false,
  error: '',
  id: '',
  data: '',
  b_contact: '',
};
/* eslint-disable default-case, no-param-reassign */
const buildingContactsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_B_CONTACTS:
        draft.id = action.id;
        draft.loading = true;
        break;
      case GET_B_CONTACTS_SUCCESS:
        draft.b_contacts = action.b_contacts;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_B_CONTACTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case CREATE_B_CONTACT:
        draft.data = action.data;
        draft.loading = true;
        break;
      case CREATE_B_CONTACT_SUCCESS:
        draft.b_contacts.push(action.b_contact);
        draft.loading = false;
        draft.error = '';
        break;
      case CREATE_B_CONTACT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default buildingContactsReducer;
