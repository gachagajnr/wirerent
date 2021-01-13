import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_ROOMS, ASSIGN_ROOM } from './constants';
import {
  getRoomsSuccess,
  getRoomsError,
  assignRoomSuccess,
  assignRoomError,
} from './actions';

import { fetchRooms, assignnRoom } from './api';

function* getRooms(organization) {
  try {
    const res = yield call(fetchRooms, organization);
    yield put(getRoomsSuccess(res.data));
  } catch (err) {
    yield put(getRoomsError(err.message));
  }
}
function* assignRoom(nroom) {
  try {
    const res = yield call(assignnRoom, nroom);
    yield put(assignRoomSuccess(res.data));
  } catch (err) {
    yield put(assignRoomError(err.message));
  }
}
// Individual exports for testing
export default function* assignExistingRoomSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(ASSIGN_ROOM, assignRoom);
  yield takeLatest(GET_ROOMS, getRooms);
}
