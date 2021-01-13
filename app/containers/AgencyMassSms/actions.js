/*
 *
 * AgencyMassSms actions
 *
 */

import {
  CREATE_SMS,
  CREATE_SMS_SUCCESS,
  CREATE_SMS_ERROR,
  GET_SMSS,
  GET_SMSS_SUCCESS,
  GET_SMSS_ERROR,
  DELETE_SMS,
  DELETE_SMS_SUCCESS,
  DELETE_SMS_ERROR,
} from './constants';

export function createSMS(data) {
  return {
    type: CREATE_SMS,
    data,
  };
}
export function createSMSSuccess(sms) {
  return {
    type: CREATE_SMS_SUCCESS,
    sms,
  };
}
export function createSMSError(error) {
  return {
    type: CREATE_SMS_ERROR,
    error,
  };
}

export function getSMSs(id) {
  return {
    type: GET_SMSS,
    id,
  };
}
export function getSMSsSuccess(smses) {
  return {
    type: GET_SMSS_SUCCESS,
    smses,
  };
}
export function getSMSsError(error) {
  return {
    type: GET_SMSS_ERROR,
    error,
  };
}

export function deleteSMS(rec) {
  return {
    type: DELETE_SMS,
    rec,
  };
}
export function deleteSMSSuccess(sms) {
  return {
    type: DELETE_SMS_SUCCESS,
    sms,
  };
}
export function deleteSMSError(error) {
  return {
    type: DELETE_SMS_ERROR,
    error,
  };
}
