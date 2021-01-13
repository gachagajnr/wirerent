/*
 *
 * AddRequests actions
 *
 */

import {
  FLAG_REQUEST,
  FLAG_REQUEST_ERROR,
  FLAG_REQUEST_SUCCESS,
  GET_REQUESTS,
  GET_REQUESTS_ERROR,
  GET_REQUESTS_SUCCESS,
} from './constants';

export function getRequests(id) {
  return {
    type: GET_REQUESTS,
    id,
  };
}
export function getRequestsSuccess(add_requests) {
  return {
    type: GET_REQUESTS_SUCCESS,
    add_requests,
  };
}
export function getRequestsError(error) {
  return {
    type: GET_REQUESTS_ERROR,
    error,
  };
}

export function flagRequest(req) {
  return {
    type: FLAG_REQUEST,
    req,
  };
}
export function flagRequestSuccess(request) {
  return {
    type: FLAG_REQUEST_SUCCESS,
    request,
  };
}
export function flagRequestError(error) {
  return {
    type: FLAG_REQUEST_ERROR,
    error,
  };
}
