import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { SEND_EMAIL, GET_B_EMAILS } from './constants';
import {
  sendEmailSuccess,
  sendEmailError,
  getBEmailsSuccess,
  getBEmailsError,
} from './actions';

import { sendEmail, fetchEmails } from './api';

function* createEmail(data) {
  try {
    const res = yield call(sendEmail, data);
    yield put(sendEmailSuccess(res));
  } catch (err) {
    yield put(sendEmailError(err.message));
  }
}
function* getEmails(id) {
  try {
    const res = yield call(fetchEmails, id);
    yield put(getBEmailsSuccess(res.data));
  } catch (err) {
    yield put(getBEmailsError(err.message));
  }
}
// Individual exports for testing
export default function* buildingMassEmailsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SEND_EMAIL, createEmail);
  yield takeLatest(GET_B_EMAILS, getEmails);
}
