import {
  CREATE_B_ADMIN_SUCCESS,
  CREATE_B_ADMIN_ERROR,
  CREATE_B_ADMIN,
  CREATE_B_ADMIN_SUCCESS,
  CREATE_B_ADMIN_ERROR,
} from './constants';
/*
 *
 * NewBuildingAdmin actions
 *
 */

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
