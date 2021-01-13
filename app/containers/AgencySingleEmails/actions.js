/*
 *
 * AgencySingleEmails actions
 *
 */

import { GET_EMAILS, GET_EMAILS_ERROR, GET_EMAILS_SUCCESS } from './constants';

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
