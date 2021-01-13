/*
 *
 * Requests actions
 *
 */

import {
  GET_REQUESTS,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_ERROR,
  ASSIGN_TASK,
  ASSIGN_TASK_SUCCESS,
  ASSIGN_TASK_ERROR,
} from './constants';

export function getRequests(organization) {
  return {
    type: GET_REQUESTS,
    organization,
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
export function assignTask(data) {
  return {
    type: ASSIGN_TASK,
    data,
  };
}

export function assignTaskSuccess(task) {
  return {
    type: ASSIGN_TASK_SUCCESS,
    task,
  };
}
export function assignTaskError(error) {
  return {
    type: ASSIGN_TASK_ERROR,
    error,
  };
}
