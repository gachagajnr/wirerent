/*
 *
 * AgencyAdmins actions
 *
 */

import {
  GET_A_ADMINS,
  GET_A_ADMINS_SUCCESS,
  GET_A_ADMINS_ERROR,
  CREATE_A_ADMIN,
  CREATE_A_ADMIN_SUCCESS,
  CREATE_A_ADMIN_ERROR,
} from './constants';

export function getA_Admins(id) {
  return {
    type: GET_A_ADMINS,
    id,
  };
}

export function getA_AdminsSuccess(a_admins) {
  return {
    type: GET_A_ADMINS_SUCCESS,
    a_admins,
  };
}
export function getA_AdminsError(error) {
  return {
    type: GET_A_ADMINS_ERROR,
    error,
  };
}

export function createAAdmin(data) {
  return {
    type: CREATE_A_ADMIN,
    data,
  };
}

export function createAAdminSuccess(a_admin) {
  return {
    type: CREATE_A_ADMIN_SUCCESS,
    a_admin,
  };
}
export function createAAdminError(error) {
  return {
    type: CREATE_A_ADMIN_ERROR,
    error,
  };
}
