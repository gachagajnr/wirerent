/*
 *
 * Agency actions
 *
 */

import {
  GET_AGENCY,
  GET_AGENCY_SUCCESS,
  GET_AGENCY_ERROR,
  ADD_AGENCY,
  ADD_AGENCY_SUCCESS,
  ADD_AGENCY_ERROR,
} from './constants';

export function getAgency(organization) {
  return {
    type: GET_AGENCY,
    organization,
  };
}
export function getAgencySuccess(agency) {
  return {
    type: GET_AGENCY_SUCCESS,
    agency,
  };
}
export function getAgencyError(error) {
  return {
    type: GET_AGENCY_ERROR,
    error,
  };
}

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
