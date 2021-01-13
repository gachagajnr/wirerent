/*
 *
 * Building actions
 *
 */

import {
  GET_BUILDING,
  GET_BUILDING_SUCCESS,
  GET_BUILDING_ERROR,
} from './constants';

export function getBuilding(id) {
  return {
    type: GET_BUILDING,
    id,
  };
}

export function getBuildingSuccess(building) {
  return {
    type: GET_BUILDING_SUCCESS,
    building,
  };
}
export function getBuildingError(error) {
  return {
    type: GET_BUILDING_ERROR,
    error,
  };
}
