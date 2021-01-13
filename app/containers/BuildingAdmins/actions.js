/*
 *
 * BuildingAdmins actions
 *
 */

import {
  GET_B_ADMINS,
  GET_B_ADMINS_SUCCESS,
  GET_B_ADMINS_ERROR,
  CREATE_B_ADMIN,
  CREATE_B_ADMIN_SUCCESS,
  CREATE_B_ADMIN_ERROR,
} from './constants';

export function getB_Admins(id) {
  return {
    type: GET_B_ADMINS,
    id,
  };
}

export function getB_AdminsSuccess(b_admins) {
  return {
    type: GET_B_ADMINS_SUCCESS,
    b_admins,
  };
}
export function getB_AdminsError(error) {
  return {
    type: GET_B_ADMINS_ERROR,
    error,
  };
}

export function createBAdmin(data) {
  return {
    type: CREATE_B_ADMIN,
    data,
  };
}

export function createBAdminSuccess(b_admin) {
  return {
    type: CREATE_B_ADMIN_SUCCESS,
    b_admin,
  };
}
export function createBAdminError(error) {
  return {
    type: CREATE_B_ADMIN_ERROR,
    error,
  };
}
