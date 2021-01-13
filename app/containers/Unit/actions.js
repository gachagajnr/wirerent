/*
 *
 * Unit actions
 *
 */

import {
  GET_UNIT,
  GET_UNIT_SUCCESS,
  GET_UNIT_ERROR,
  REQ_MOVE,
  REQ_MOVE_SUCCESS,
  REQ_MOVE_ERROR,
  NOTIFY,
  NOTIFY_SUCCESS,
  NOTIFY_ERROR,
  CANCEL_MOVE,
  CANCEL_MOVE_SUCCESS,
  CANCEL_MOVE_ERROR,
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SEND_SMS,
  SEND_SMS_SUCCESS,
  SEND_SMS_ERROR,
  REMOVE_TENANT,
  REMOVE_TENANT_SUCCESS,
  REMOVE_TENANT_ERROR,
} from './constants';

export function getUnit(id) {
  return {
    type: GET_UNIT,
    id,
  };
}

export function getUnitSuccess(unit) {
  return {
    type: GET_UNIT_SUCCESS,
    unit,
  };
}

export function getUnitError(error) {
  return {
    type: GET_UNIT_ERROR,
    error,
  };
}
// requestMoveOut
export function requestMoveOut(room) {
  return {
    type: REQ_MOVE,
    room,
  };
}

export function requestMoveOutSuccess(mroom) {
  return {
    type: REQ_MOVE_SUCCESS,
    mroom,
  };
}

export function requestMoveOutError(error) {
  return {
    type: REQ_MOVE_ERROR,
    error,
  };
}

// sendNotice
export function sendNotice(notice) {
  return {
    type: NOTIFY,
    notice,
  };
}

export function sendNoticeSuccess(notice) {
  return {
    type: NOTIFY_SUCCESS,
    notice,
  };
}
export function sendNoticeError(error) {
  return {
    type: NOTIFY_ERROR,
    error,
  };
}
// cancelMove
export function cancelReqMove(room) {
  return {
    type: CANCEL_MOVE,
    room,
  };
}

export function cancelReqMoveSuccess(room) {
  return {
    type: CANCEL_MOVE_SUCCESS,
    room,
  };
}
export function cancelReqMoveError(error) {
  return {
    type: CANCEL_MOVE_ERROR,
    error,
  };
}

// SEND SMS
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
// email
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
// REMOVE USER
export function removeTenant(id) {
  return {
    type: REMOVE_TENANT,
    id,
  };
}

export function removeTenantSuccess(remove) {
  return {
    type: REMOVE_TENANT_SUCCESS,
    remove,
  };
}
export function removeTenantError(error) {
  return {
    type: REMOVE_TENANT_ERROR,
    error,
  };
}
