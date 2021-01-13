import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_REQUEST } from './constants';
import { getRequestSuccess, getRequestError } from './actions';

import { fetchRequest } from './api';

function* getRequest(id) {
  try {
    const res = yield call(fetchRequest, id);
    console.log(res);
    yield put(getRequestSuccess(res));
  } catch (err) {
    yield put(getRequestError(err.message));
  }
}
// Individual exports for testing
export default function* requestDetailsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_REQUEST, getRequest);
}
