/*
 *
 * BuildingRequests actions
 *
 */

import {
  GET_B_REQUESTS,
  GET_B_REQUESTS_SUCCESS,
  GET_B_REQUESTS_ERROR,
} from './constants';

export function getB_Requests(id) {
  return {
    type: GET_B_REQUESTS,
    id,
  };
}

export function getB_RequestsSuccess(b_requests) {
  return {
    type: GET_B_REQUESTS_SUCCESS,
    b_requests,
  };
}
export function getB_RequestsError(error) {
  return {
    type: GET_B_REQUESTS_ERROR,
    error,
  };
}
