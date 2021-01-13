import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { GET_A_ADMINS, CREATE_A_ADMIN } from './constants';
import {
  getA_AdminsSuccess,
  getA_AdminsError,
  createAAdminSuccess,
  createAAdminError,
} from './actions';

import { fetchA_Admins, createA_Admin } from './api';

function* getAAdmins(id) {
  try {
    const res = yield call(fetchA_Admins, id);
    yield put(getA_AdminsSuccess(res.data));
  } catch (err) {
    yield put(getA_AdminsError(err.message));
  }
}

function* newAAdmin(data) {
  try {
    const res = yield call(createA_Admin, data);
    yield put(createAAdminSuccess(res));
  } catch (err) {
    yield put(createAAdminError(err.message));
  }
}
// Individual exports for testing
export default function* agencyAdminsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_A_ADMINS, getAAdmins);
  yield takeLatest(CREATE_A_ADMIN, newAAdmin);
}
