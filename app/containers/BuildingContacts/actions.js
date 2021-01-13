/*
 *
 * BuildingContacts actions
 *
 */

import {
  GET_B_CONTACTS,
  GET_B_CONTACTS_SUCCESS,
  GET_B_CONTACTS_ERROR,
  CREATE_B_CONTACT,
  CREATE_B_CONTACT_SUCCESS,
  CREATE_B_CONTACT_ERROR,
} from './constants';

export function getB_Contacts(id) {
  return {
    type: GET_B_CONTACTS,
    id,
  };
}

export function getB_ContactsSuccess(b_contacts) {
  return {
    type: GET_B_CONTACTS_SUCCESS,
    b_contacts,
  };
}
export function getB_ContactsError(error) {
  return {
    type: GET_B_CONTACTS_ERROR,
    error,
  };
}

export function createB_Contact(data) {
  return {
    type: CREATE_B_CONTACT,
    data,
  };
}

export function createB_ContactSuccess(b_contact) {
  return {
    type: CREATE_B_CONTACT_SUCCESS,
    b_contact,
  };
}
export function createB_ContactError(error) {
  return {
    type: CREATE_B_CONTACT_ERROR,
    error,
  };
}
