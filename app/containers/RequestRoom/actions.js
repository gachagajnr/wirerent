/*
 *
 * RequestRoom actions
 *
 */

import {
  CREATE_REQUEST,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_ERROR,
} from './constants';

export function createRequest(data) {
  return {
    type: CREATE_REQUEST,
    data,
  };
}

export function createRequestSuccess(request) {
  return {
    type: CREATE_REQUEST_SUCCESS,
    request,
  };
}
export function createRequestError(error) {
  return {
    type: CREATE_REQUEST_ERROR,
    error,
  };
}
