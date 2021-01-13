import { FLAG_REQUEST, GET_REQUESTS } from './constants';
import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import { fetchRequests, flagRequest } from './api';
import {
  flagRequestError,
  flagRequestSuccess,
  getRequestsError,
  getRequestsSuccess,
} from './actions';

function* getRequests(id) {
  try {
    const res = yield call(fetchRequests, id);
    yield put(getRequestsSuccess(res.data));
  } catch (err) {
    yield put(getRequestsError(err.message));
  }
}

function* flagARequest(req) {
  try {
    const res = yield call(flagRequest, req);
    yield put(flagRequestSuccess(res.data));
  } catch (err) {
    yield put(flagRequestError(err.message));
  }
}
// Individual exports for testing
export default function* addRequestsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_REQUESTS, getRequests);
  yield takeLatest(FLAG_REQUEST, flagARequest);
}
