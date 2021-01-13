import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_BUILDING } from './constants';
import { getBuildingSuccess, getBuildingError } from './actions';

import { fetchBuilding } from './api';

function* getBuilding(id) {
  try {
    const res = yield call(fetchBuilding, id);
   
    yield put(getBuildingSuccess(res));
  } catch (err) {
    yield put(getBuildingError(err.message));
  }
}
// Individual exports for testing
export default function* buildingSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_BUILDING, getBuilding);
}
