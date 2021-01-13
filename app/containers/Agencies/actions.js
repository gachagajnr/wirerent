/*
 *
 * Agencies actions
 *
 */

import {
  GET_AGENCIES,
  GET_AGENCIES_SUCCESS,
  GET_AGENCIES_ERROR,
} from './constants';

export function getAgencies() {
  return {
    type: GET_AGENCIES,
  };
}
export function getAgenciesSuccess(agencies) {
  return {
    type: GET_AGENCIES_SUCCESS,
    agencies,
  };
}
export function getAgenciesError(error) {
  return {
    type: GET_AGENCIES_ERROR,
    error,
  };
}
