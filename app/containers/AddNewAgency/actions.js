/*
 *
 * AddNewAgency actions
 *
 */

import { ADD_AGENCY, ADD_AGENCY_SUCCESS, ADD_AGENCY_ERROR } from './constants';

export function addAgency(data) {
  return {
    type: ADD_AGENCY,
    data,
  };
}
export function addAgencySuccess(agency) {
  return {
    type: ADD_AGENCY_SUCCESS,
    agency,
  };
}
export function addAgencyError(error) {
  return {
    type: ADD_AGENCY_ERROR,
    error,
  };
}
