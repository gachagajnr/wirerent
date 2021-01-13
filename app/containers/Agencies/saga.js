// import { fetchAgencies } from './api';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_AGENCIES } from './constants';
import { getAgenciesSuccess, getAgenciesError } from './actions';
import { fetchAgencies } from './api';

export function* getAgencies() {
  try {
    const agencies = yield call(fetchAgencies);
    yield put(getAgenciesSuccess(agencies.data));
  } catch (err) {
    yield put(getAgenciesError(err.message));
  }
}

// Individual exports for testing
export default function* agenciesSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_AGENCIES, getAgencies);
}
