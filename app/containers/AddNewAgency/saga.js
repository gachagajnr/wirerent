import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { ADD_AGENCY } from './constants';
import { addAgencySuccess, addAgencyError } from './actions';
import { addNewAgency } from './api';

export function* addAgency(data) {
  try {
    const agency = yield call(addNewAgency, data);
    yield put(addAgencySuccess(agency));
  } catch (err) {
    yield put(addAgencyError(err.message));
  }
}
// Individual exports for testing
export default function* addNewAgencySaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(ADD_AGENCY, addAgency);
}
