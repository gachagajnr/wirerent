/*
 *
 * BuildingMassSms actions
 *
 */

import {
  SEND_SMS,
  SEND_SMS_SUCCESS,
  SEND_SMS_ERROR,
  GET_B_SMS,
  GET_B_SMS_SUCCESS,
  GET_B_SMS_ERROR,
} from './constants';

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

export function getBSms(id) {
  return {
    type: GET_B_SMS,
    id,
  };
}
export function getBSmsSuccess(smses) {
  return {
    type: GET_B_SMS_SUCCESS,
    smses,
  };
}
export function getBSmsError(error) {
  return {
    type: GET_B_SMS_ERROR,
    error,
  };
}
