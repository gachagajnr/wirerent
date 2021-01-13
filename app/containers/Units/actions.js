/*
 *
 * Units actions
 *
 */

import {
  GET_ROOMS,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_ERROR,
  CREATE_ROOM,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_ERROR,
} from './constants';

export function getRooms(organization, isVacant) {
  return {
    type: GET_ROOMS,
    organization,
    isVacant,
  };
}
export function getRoomsSuccess(units) {
  return {
    type: GET_ROOMS_SUCCESS,
    units,
  };
}
export function getRoomsError(error) {
  return {
    type: GET_ROOMS_ERROR,
    error,
  };
}

export function createRoom(data) {
  return {
    type: CREATE_ROOM,
    data,
  };
}
export function createRoomSuccess(unit) {
  return {
    type: CREATE_ROOM_SUCCESS,
    unit,
  };
}
export function createRoomError(error) {
  return {
    type: CREATE_ROOM_ERROR,
    error,
  };
}
