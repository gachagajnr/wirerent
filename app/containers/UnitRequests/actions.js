/*
 *
 * UnitRequests actions
 *
 */

import {
  CREATE_REQUEST,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_ERROR,
  GET_REQUESTS,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_ERROR,
  CANCEL_REQUEST,
  CANCEL_REQUEST_SUCCESS,
  CANCEL_REQUEST_ERROR,
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

export function getRequests(id) {
  return {
    type: GET_REQUESTS,
    id,
  };
}
export function getRequestsSuccess(requests) {
  return {
    type: GET_REQUESTS_SUCCESS,
    requests,
  };
}
export function getRequestsError(error) {
  return {
    type: GET_REQUESTS_ERROR,
    error,
  };
}
export function cancelRequest(data) {
  return {
    type: CANCEL_REQUEST,
    data,
  };
}
export function cancelRequestSuccess(request) {
  return {
    type: CANCEL_REQUEST_SUCCESS,
    request,
  };
}
export function cancelRequestError(error) {
  return {
    type: CANCEL_REQUEST_ERROR,
    error,
  };
}
