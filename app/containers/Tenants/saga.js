import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { GET_TENANTS, SEND_EMAIL, SEND_SMS } from './constants';
import {
  getTenantsSuccess,
  getTenantsError,
  sendEmailSuccess,
  sendEmailError,
  sendSmsSuccess,
  sendSmsError,
} from './actions';

import { fetchTenants, singleSms, singleEmail } from './api';

function* getTenants(organization) {
  try {
    const res = yield call(fetchTenants, organization);
    yield put(getTenantsSuccess(res.data));
  } catch (err) {
    yield put(getTenantsError(err.message));
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
export default function* tenantsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_TENANTS, getTenants);
  yield takeLatest(SEND_EMAIL, sendEmail);
  yield takeLatest(SEND_SMS, sendSms);
}
