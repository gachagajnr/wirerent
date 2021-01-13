import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { CREATE_SMS, GET_SMSS, DELETE_SMS } from './constants';
import {
  createSMSSuccess,
  createSMSError,
  getSMSsSuccess,
  getSMSsError,
  deleteSMSSuccess,
  deleteSMSError,
} from './actions';

import { createSMS, fetchSMSs, deleteSMS } from './api';

function* createASMS(data) {
  try {
    const res = yield call(createSMS, data);
    yield put(createSMSSuccess(res));
  } catch (err) {
    yield put(createSMSError(err.message));
  }
}
function* deleteASMS(rec) {
  try {
    const res = yield call(deleteSMS, rec);
    yield put(deleteSMSSuccess(res));
  } catch (err) {
    yield put(deleteSMSError(err.message));
  }
}
function* getSMSs(id) {
  try {
    const res = yield call(fetchSMSs, id);
    yield put(getSMSsSuccess(res.data));
  } catch (err) {
    yield put(getSMSsError(err.message));
  }
}
// Individual exports for testing
export default function* agencyMassSmsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_SMSS, getSMSs);
  yield takeLatest(CREATE_SMS, createASMS);
  yield takeLatest(DELETE_SMS, deleteASMS);
}
