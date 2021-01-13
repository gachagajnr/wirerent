import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_ROOMS, CREATE_ROOM } from './constants';
import { fetchUnits, createUnit } from './api';
import {
  getRoomsSuccess,
  getRoomsError,
  createRoomSuccess,
  createRoomError,
} from './actions';

function* getUnits(organization, isVacant) {
  try {
    const res = yield call(fetchUnits, organization);
    yield put(getRoomsSuccess(res.data));
  } catch (err) {
    console.log(err);
    yield put(getRoomsError(err.message));
  }
}

function* createNewUnit(data) {
  try {
    const res = yield call(createUnit, data);
    yield put(createRoomSuccess(res));
  } catch (err) {
    console.log(err);
    yield put(createRoomError(err.message));
  }
}
// Individual exports for testing
export default function* unitsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ROOMS, getUnits);
  yield takeLatest(CREATE_ROOM, createNewUnit);
}
