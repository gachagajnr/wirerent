/*
 *
 * AssignRoom actions
 *
 */

import {
  GET_BUILDINGS,
  GET_BUILDINGS_SUCCESS,
  GET_BUILDINGS_ERROR,
  CREATE_ROOM,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_ERROR,
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
export function createRoom(nroom) {
  return {
    type: CREATE_ROOM,
    nroom,
  };
}

export function createRoomSuccess(room) {
  return {
    type: CREATE_ROOM_SUCCESS,
    room,
  };
}
export function createRoomError(error) {
  return {
    type: CREATE_ROOM_ERROR,
    error,
  };
}
