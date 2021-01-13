/*
 *
 * AgencyMassEmails actions
 *
 */

import {
  CREATE_EMAIL,
  CREATE_EMAIL_SUCCESS,
  CREATE_EMAIL_ERROR,
  GET_EMAILS,
  GET_EMAILS_SUCCESS,
  GET_EMAILS_ERROR,
  DELETE_EMAIL,
  DELETE_EMAIL_SUCCESS,
  DELETE_EMAIL_ERROR,
} from './constants';

export function createEmail(data) {
  return {
    type: CREATE_EMAIL,
    data,
  };
}
export function createEmailSuccess(email) {
  return {
    type: CREATE_EMAIL_SUCCESS,
    email,
  };
}
export function createEmailError(error) {
  return {
    type: CREATE_EMAIL_ERROR,
    error,
  };
}

export function getEmails(id) {
  return {
    type: GET_EMAILS,
    id,
  };
}
export function getEmailsSuccess(emails) {
  return {
    type: GET_EMAILS_SUCCESS,
    emails,
  };
}
export function getEmailsError(error) {
  return {
    type: GET_EMAILS_ERROR,
    error,
  };
}

export function deleteEmail(rec) {
  return {
    type: DELETE_EMAIL,
    rec,
  };
}
export function deleteEmailSuccess(email) {
  return {
    type: DELETE_EMAIL_SUCCESS,
    email,
  };
}
export function deleteEmailError(error) {
  return {
    type: DELETE_EMAIL_ERROR,
    error,
  };
}
