/*
 *
 * BuildingUnits actions
 *
 */

import {
  GET_ROOMS,
  GET_ROOMS_ERROR,
  GET_ROOMS_SUCCESS,
  SEND_EMAIL,
  SEND_EMAIL_ERROR,
  SEND_EMAIL_SUCCESS,
  SEND_SMS,
  SEND_SMS_ERROR,
  SEND_SMS_SUCCESS,
} from './constants';

export function getRooms(id, isVacant) {
  return {
    type: GET_ROOMS,
    id,
    isVacant,
  };
}
export function getRoomsSuccess(units) {
  return {
    type: GET_ROOMS_SUCCESS,
    units,
  };
}
export function getRoomsError(error) {
  return {
    type: GET_ROOMS_ERROR,
    error,
  };
}


export function sendSms(data) {
  return {
    type: SEND_SMS,
    data,
  };
}

export function sendSmsSuccess(sms) {
  return {
    type: SEND_SMS_SUCCESS,
    sms,
  };
}
export function sendSmsError(error) {
  return {
    type: SEND_SMS_ERROR,
    error,
  };
}
// send email
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
