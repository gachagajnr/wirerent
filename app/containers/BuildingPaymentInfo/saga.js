import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { GET_B_PAY_INFO, CREATE_B_PAY_INFO } from './constants';
import {
  getB_PayInfoSuccess,
  getB_PayInfoError,
  createB_PayInfoSuccess,
  createB_PayInfoError,
} from './actions';

import { fetchB_PayInfo, createB_PayInfo } from './api';

function* getB_PayInfo(id) {
  try {
    const res = yield call(fetchB_PayInfo, id);
    yield put(getB_PayInfoSuccess(res.data[0]));
  } catch (err) {
    yield put(getB_PayInfoError(err.message));
  }
}

function* newB_PayInfo(data) {
  try {
    const res = yield call(createB_PayInfo, data);
    console.log(res);
    yield put(createB_PayInfoSuccess(res));
  } catch (err) {
    yield put(createB_PayInfoError(err.message));
  }
}
// Individual exports for testing
export default function* buildingPaymentInfoSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_B_PAY_INFO, getB_PayInfo);
  yield takeLatest(CREATE_B_PAY_INFO, newB_PayInfo);
}
