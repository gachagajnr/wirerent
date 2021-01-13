/*
 *
 * AssignExistingRoom actions
 *
 */

import {
  GET_ROOMS,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_ERROR,
  ASSIGN_ROOM,
  ASSIGN_ROOM_SUCCESS,
  ASSIGN_ROOM_ERROR,
} from './constants';

export function getRooms(organization) {
  return {
    type: GET_ROOMS,
    organization,
  };
}

export function getRoomsSuccess(rooms) {
  return {
    type: GET_ROOMS_SUCCESS,
    rooms,
  };
}
export function getRoomsError(error) {
  return {
    type: GET_ROOMS_ERROR,
    error,
  };
}
export function assignRoom(nroom) {
  return {
    type: ASSIGN_ROOM,
    nroom,
  };
}

export function assignRoomSuccess(room) {
  return {
    type: ASSIGN_ROOM_SUCCESS,
    room,
  };
}
export function assignRoomError(error) {
  return {
    type: ASSIGN_ROOM_ERROR,
    error,
  };
}
