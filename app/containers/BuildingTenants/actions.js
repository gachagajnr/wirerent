/*
 *
 * BuildingTenants actions
 *
 */

import {
  GET_TENANTS,
  GET_TENANTS_ERROR,
  GET_TENANTS_SUCCESS,
  SEND_EMAIL,
  SEND_EMAIL_ERROR,
  SEND_EMAIL_SUCCESS,
  SEND_SMS,
  SEND_SMS_ERROR,
  SEND_SMS_SUCCESS,
} from './constants';

export function getTenants(id) {
  return {
    type: GET_TENANTS,
    id,
  };
}

export function getTenantsSuccess(tenants) {
  return {
    type: GET_TENANTS_SUCCESS,
    tenants,
  };
}
export function getTenantsError(error) {
  return {
    type: GET_TENANTS_ERROR,
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
