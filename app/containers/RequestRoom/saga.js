import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { CREATE_REQUEST } from './constants';
import { createRequestSuccess, createRequestError } from './actions';

import { createRequest } from './api';

function* newRequest(data) {
  try {
    const res = yield call(createRequest, data);
    yield put(createRequestSuccess(res));
  } catch (err) {
    yield put(createRequestError(err.message));
  }
}
// Individual exports for testing
export default function* requestRoomSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(CREATE_REQUEST, newRequest);
}
