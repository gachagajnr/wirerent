import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { GET_REQUESTS, CREATE_REQUEST, CANCEL_REQUEST } from './constants';
import {
  getRequestsSuccess,
  getRequestsError,
  createRequestSuccess,
  createRequestError,
  cancelRequestSuccess,
  cancelRequestError,
} from './actions';

import { fetchRequests, newRequest, cancelRequest } from './api';

function* getRequests(id) {
  try {
    const res = yield call(fetchRequests, id);
    yield put(getRequestsSuccess(res.data));
  } catch (err) {
    yield put(getRequestsError(err.message));
  }
}

function* createRequest(data) {
  try {
    const res = yield call(newRequest, data);
    yield put(createRequestSuccess(res));
  } catch (err) {
    yield put(createRequestError(err.message));
  }
}

function* cancelMyRequest(data) {
  try {
    const res = yield call(cancelRequest, data);
    yield put(cancelRequestSuccess(res));
  } catch (err) {
    yield put(cancelRequestError(err.message));
  }
}
// Individual exports for testing
export default function* unitRequestsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_REQUESTS, getRequests);
  yield takeLatest(CREATE_REQUEST, createRequest);
  yield takeLatest(CANCEL_REQUEST, cancelMyRequest);
}
