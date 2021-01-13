import { GET_ROOMS, SEND_EMAIL, SEND_SMS } from './constants';
import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import { fetchUnits, singleEmail, singleSms } from './api';
import {
  getRoomsError,
  getRoomsSuccess,
  sendEmailError,
  sendEmailSuccess,
  sendSmsError,
  sendSmsSuccess,
} from './actions';

function* getUnits(id) {
  try {
    const res = yield call(fetchUnits, id);
    yield put(getRoomsSuccess(res.data));
  } catch (err) {
    console.log(err);
    yield put(getRoomsError(err.message));
  }
}

function* sendEmail(data) {
  try {
    const res = yield call(singleEmail, data);
    yield put(sendEmailSuccess(res));
  } catch (err) {
    yield put(sendEmailError(err.message));
  }
}

function* sendSms(data) {
  try {
    const res = yield call(singleSms, data);
    yield put(sendSmsSuccess(res));
  } catch (err) {
    yield put(sendSmsError(err.message));
  }
}
// Individual exports for testing
export default function* buildingUnitsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ROOMS, getUnits);
  yield takeLatest(SEND_EMAIL, sendEmail);
  yield takeLatest(SEND_SMS, sendSms);
}
