import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { GET_B_ADMINS, CREATE_B_ADMIN } from './constants';
import {
  getB_AdminsSuccess,
  getB_AdminsError,
  createBAdminSuccess,
  createBAdminError,
} from './actions';

import { fetchB_Admins, createB_Admin } from './api';

function* getBAdmins(id) {
  try {
    const res = yield call(fetchB_Admins, id);
    yield put(getB_AdminsSuccess(res.data));
  } catch (err) {
    yield put(getB_AdminsError(err.message));
  }
}

function* newBAdmin(data) {
  try {
    const res = yield call(createB_Admin, data);
    yield put(createBAdminSuccess(res));
  } catch (err) {
    yield put(createBAdminError(err.message));
  }
}
// Individual exports for testing
export default function* buildingAdminsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_B_ADMINS, getBAdmins);
  yield takeLatest(CREATE_B_ADMIN, newBAdmin);
}
