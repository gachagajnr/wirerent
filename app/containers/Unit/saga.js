import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  GET_UNIT,
  REQ_MOVE,
  NOTIFY,
  CANCEL_MOVE,
  SEND_EMAIL,
  SEND_SMS,
  REMOVE_TENANT,
} from './constants';
import {
  getUnitSuccess,
  getUnitError,
  requestMoveOutSuccess,
  requestMoveOutError,
  sendNoticeSuccess,
  sendNoticeError,
  cancelReqMoveSuccess,
  cancelReqMoveError,
  sendEmailSuccess,
  sendEmailError,
  sendSmsSuccess,
  sendSmsError,
  removeTenantSuccess,
  removeTenantError,
} from './actions';

import {
  fetchUnit,
  requestMove,
  createNotice,
  cancelMove,
  sendSms,
  sendEmail,
  vacateUser,
} from './api';

function* getUnit(id) {
  try {
    const res = yield call(fetchUnit, id);

    yield put(getUnitSuccess(res));
  } catch (err) {
    yield put(getUnitError(err.message));
  }
}

function* reqMove(room) {
  try {
    const res = yield call(requestMove, room);

    yield put(requestMoveOutSuccess(res));
  } catch (err) {
    yield put(requestMoveOutError(err.message));
  }
}

function* notifyRoom(notice) {
  try {
    const res = yield call(createNotice, notice);

    yield put(sendNoticeSuccess(res));
  } catch (err) {
    yield put(sendNoticeError(err.message));
  }
}

function* cancelRMove(room) {
  try {
    const res = yield call(cancelMove, room);

    yield put(cancelReqMoveSuccess(res));
  } catch (err) {
    yield put(cancelReqMoveError(err.message));
  }
}

function* sendSSms(data) {
  try {
    const res = yield call(sendSms, data);

    yield put(sendSmsSuccess(res));
  } catch (err) {
    yield put(sendSmsError(err.message));
  }
}

function* sendSEmail(data) {
  try {
    const res = yield call(sendEmail, data);

    yield put(sendEmailSuccess(res));
  } catch (err) {
    yield put(sendEmailError(err.message));
  }
}

function* removeTenant(id) {
  try {
    const res = yield call(vacateUser, id);

    yield put(removeTenantSuccess(res));
  } catch (err) {
    console.log(err);
    yield put(removeTenantError(err.message));
  }
}
// Individual exports for testing
export default function* unitSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_UNIT, getUnit);
  yield takeLatest(REQ_MOVE, reqMove);
  yield takeLatest(NOTIFY, notifyRoom);
  yield takeLatest(CANCEL_MOVE, cancelRMove);
  yield takeLatest(SEND_EMAIL, sendSEmail);
  yield takeLatest(SEND_SMS, sendSSms);
  yield takeLatest(REMOVE_TENANT, removeTenant);
}
