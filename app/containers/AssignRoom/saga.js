import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_BUILDINGS, CREATE_ROOM } from './constants';
import {
  getBuildingsSuccess,
  getBuildingsError,
  createRoomSuccess,
  createRoomError,
} from './actions';

import { fetchBuildings, createnRoom } from './api';

function* getBuildings(organization) {
  try {
    const res = yield call(fetchBuildings, organization);
    yield put(getBuildingsSuccess(res.data));
  } catch (err) {
    yield put(getBuildingsError(err.message));
  }
}
function* createRoom(nroom) {
  try {
    const res = yield call(createnRoom, nroom);
    yield put(createRoomSuccess(res.data));
  } catch (err) {
    yield put(createRoomError(err.message));
  }
}
// Individual exports for testing
export default function* assignRoomSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_BUILDINGS, getBuildings);
  yield takeLatest(CREATE_ROOM, createRoom);
}
