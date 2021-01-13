import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { GET_B_REQUESTS } from './constants';
import { getB_RequestsSuccess, getB_RequestsError } from './actions';

import { fetchB_Requests } from './api';

function* getB_Requests(id) {
  try {
    const res = yield call(fetchB_Requests, id);
    console.log(res);
    yield put(getB_RequestsSuccess(res.data));
  } catch (err) {
    yield put(getB_RequestsError(err.message));
  }
}
// Individual exports for testing
export default function* buildingRequestsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_B_REQUESTS, getB_Requests);
}
