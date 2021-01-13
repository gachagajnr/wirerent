import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { SEND_SMS, GET_B_SMS } from './constants';
import {
  sendSmsSuccess,
  sendSmsError,
  getBSmsSuccess,
  getBSmsError,
} from './actions';

import { sendSms, fetchSmses } from './api';

function* createSms(data) {
  try {
    const res = yield call(sendSms, data);
    yield put(sendSmsSuccess(res));
  } catch (err) {
    yield put(sendSmsError(err.message));
  }
}
function* getSmses(id) {
  try {
    const res = yield call(fetchSmses, id);
    yield put(getBSmsSuccess(res.data));
  } catch (err) {
    yield put(getBSmsError(err.message));
  }
}
// Individual exports for testing
export default function* buildingMassSmsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SEND_SMS, createSms);
  yield takeLatest(GET_B_SMS, getSmses);
}
