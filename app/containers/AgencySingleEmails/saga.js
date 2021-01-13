import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import { getEmailsError, getEmailsSuccess } from './actions';

import { GET_EMAILS } from './constants';
import { fetchEmails } from './api';

function* getEmails(id) {
  try {
    const res = yield call(fetchEmails, id);
    yield put(getEmailsSuccess(res.data));
  } catch (err) {
    yield put(getEmailsError(err.message));
  }
}
// Individual exports for testing
export default function* agencySingleEmailsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_EMAILS, getEmails);
}
