/*
 *
 * Tenants actions
 *
 */

import {
  GET_TENANTS,
  GET_TENANTS_SUCCESS,
  GET_TENANTS_ERROR,
  SEND_SMS,
  SEND_SMS_SUCCESS,
  SEND_SMS_ERROR,
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
} from './constants';

export function getTenants(organization) {
  return {
    type: GET_TENANTS,
    organization,
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
// send sms
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
