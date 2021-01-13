import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_REQUESTS, ASSIGN_TASK } from './constants';
import {
  getRequestsSuccess,
  getRequestsError,
  assignTaskSuccess,
  assignTaskError,
} from './actions';

import { fetchRequests, assignTask } from './api';

function* getRequests(organization) {
  try {
    const res = yield call(fetchRequests, organization);
    console.log(res);
    yield put(getRequestsSuccess(res.data));
  } catch (err) {
    yield put(getRequestsError(err.message));
  }
}
function* asssignRequests(data) {
  try {
    const res = yield call(assignTask, data);
    console.log(res);
    yield put(assignTaskSuccess(res));
  } catch (err) {
    yield put(assignTaskError(err.message));
  }
}
// Individual exports for testing
export default function* requestsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_REQUESTS, getRequests);
  yield takeLatest(ASSIGN_TASK, asssignRequests);
}
