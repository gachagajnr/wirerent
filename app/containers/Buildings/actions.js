/*
 *
 * Buildings actions
 *
 */

import {
  GET_BUILDINGS,
  GET_BUILDINGS_SUCCESS,
  GET_BUILDINGS_ERROR,
  CREATE_BUILDING,
  CREATE_BUILDING_SUCCESS,
  CREATE_BUILDING_ERROR,
} from './constants';

export function getBuildings(organization) {
  return {
    type: GET_BUILDINGS,
    organization,
  };
}

export function getBuildingsSuccess(buildings) {
  return {
    type: GET_BUILDINGS_SUCCESS,
    buildings,
  };
}
export function getBuildingsError(error) {
  return {
    type: GET_BUILDINGS_ERROR,
    error,
  };
}
export function createBuilding(data) {
  return {
    type: CREATE_BUILDING,
    data,
  };
}

export function createBuildingSuccess(building) {
  return {
    type: CREATE_BUILDING_SUCCESS,
    building,
  };
}
export function createBuildingError(error) {
  return {
    type: CREATE_BUILDING_ERROR,
    error,
  };
}
