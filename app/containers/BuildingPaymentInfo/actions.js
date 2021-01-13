/*
 *
 * BuildingPaymentInfo actions
 *
 */

import {
  GET_B_PAY_INFO,
  GET_B_PAY_INFO_SUCCESS,
  GET_B_PAY_INFO_ERROR,
  CREATE_B_PAY_INFO,
  CREATE_B_PAY_INFO_SUCCESS,
  CREATE_B_PAY_INFO_ERROR,
} from './constants';

export function getB_PayInfo(id) {
  return {
    type: GET_B_PAY_INFO,
    id,
  };
}

export function getB_PayInfoSuccess(payinfo) {
  return {
    type: GET_B_PAY_INFO_SUCCESS,
    payinfo,
  };
}
export function getB_PayInfoError(error) {
  return {
    type: GET_B_PAY_INFO_ERROR,
    error,
  };
}
export function createB_PayInfo(data) {
  return {
    type: CREATE_B_PAY_INFO,
    data,
  };
}

export function createB_PayInfoSuccess(payinfo) {
  return {
    type: CREATE_B_PAY_INFO_SUCCESS,
    payinfo,
  };
}
export function createB_PayInfoError(error) {
  return {
    type: CREATE_B_PAY_INFO_ERROR,
    error,
  };
}
