/*
 *
 * AgencySingleSms actions
 *
 */

import { GET_SMS, GET_SMS_ERROR, GET_SMS_SUCCESS } from './constants';

export function getSms(id) {
  return {
    type: GET_SMS,
    id,
  };
}
export function getSmsSuccess(sms) {
  return {
    type: GET_SMS_SUCCESS,
    sms,
  };
}
export function getSmsError(error) {
  return {
    type: GET_SMS_ERROR,
    error,
  };
}
