import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import { getSmsError, getSmsSuccess } from './actions';

import { GET_SMS } from './constants';
import { fetchSmss } from './api';

function* getSms(id) {
  try {
    const res = yield call(fetchSmss, id);
    yield put(getSmsSuccess(res.data));
  } catch (err) {
    yield put(getSmsError(err.message));
  }
}
// Individual exports for testing
export default function* agencySingleSmsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_SMS, getSms);
}
