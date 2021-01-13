import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { CREATE_EMAIL, GET_EMAILS, DELETE_EMAIL } from './constants';
import {
  createEmailSuccess,
  createEmailError,
  getEmailsSuccess,
  getEmailsError,
  deleteEmailSuccess,
  deleteEmailError,
} from './actions';

import { createEmail, fetchEmails, deleteEmail } from './api';

function* createMEmail(data) {
  try {
    const res = yield call(createEmail, data);
    yield put(createEmailSuccess(res));
  } catch (err) {
    yield put(createEmailError(err.message));
  }
}

function* deleteMEmail(rec) {
  try {
    const res = yield call(deleteEmail, rec);
    yield put(deleteEmailSuccess(res));
  } catch (err) {
    yield put(deleteEmailError(err.message));
  }
}

function* getEmails(id) {
  try {
    const res = yield call(fetchEmails, id);
    yield put(getEmailsSuccess(res.data));
  } catch (err) {
    yield put(getEmailsError(err.message));
  }
}
// Individual exports for testing
export default function* agencyMassEmailsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_EMAILS, getEmails);
  yield takeLatest(CREATE_EMAIL, createMEmail);
  yield takeLatest(DELETE_EMAIL, deleteMEmail);
}
