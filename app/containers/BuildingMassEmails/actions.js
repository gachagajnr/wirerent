/*
 *
 * BuildingMassEmails actions
 *
 */

import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  GET_B_EMAILS,
  GET_B_EMAILS_SUCCESS,
  GET_B_EMAILS_ERROR,
} from './constants';

export function sendEmail(data) {
  return {
    type: SEND_EMAIL,
    data,
  };
}
export function sendEmailSuccess(email) {
  return {
    type: SEND_EMAIL_SUCCESS,
    email,
  };
}
export function sendEmailError(error) {
  return {
    type: SEND_EMAIL_ERROR,
    error,
  };
}

export function getBEmails(id) {
  return {
    type: GET_B_EMAILS,
    id,
  };
}
export function getBEmailsSuccess(emails) {
  return {
    type: GET_B_EMAILS_SUCCESS,
    emails,
  };
}
export function getBEmailsError(error) {
  return {
    type: GET_B_EMAILS_ERROR,
    error,
  };
}
