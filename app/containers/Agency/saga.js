import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_AGENCY, ADD_AGENCY } from './constants';
import {
  getAgencySuccess,
  getAgencyError,
  addAgencySuccess,
  addAgencyError,
} from './actions';
import { fetchAgency, addNewAgency } from './api';

export function* getAgency(organization) {
  try {
    const agency = yield call(fetchAgency, organization);
    yield put(getAgencySuccess(agency));
  } catch (err) {
    yield put(getAgencyError(err.message));
  }
}

export function* addAgency(data) {
  try {
    const agency = yield call(addNewAgency, data);
    yield put(addAgencySuccess(agency));
  } catch (err) {
    yield put(addAgencyError(err.message));
  }
}
// Individual exports for testing
export default function* agencySaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_AGENCY, getAgency);
  yield takeLatest(ADD_AGENCY, addAgency);
}
