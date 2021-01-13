import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_BUILDINGS, CREATE_BUILDING } from './constants';
import {
  getBuildingsSuccess,
  getBuildingsError,
  createBuildingSuccess,
  createBuildingError,
} from './actions';

import { fetchBuildings, saveBuilding } from './api';

function* getBuildings(organization) {
  try {
    const res = yield call(fetchBuildings, organization);
    yield put(getBuildingsSuccess(res.data));
  } catch (err) {
    yield put(getBuildingsError(err.message));
  }
}

function* createBuilding(data) {
  try {
    const res = yield call(saveBuilding, data);
    yield put(createBuildingSuccess(res));
  } catch (err) {
    yield put(createBuildingError(err.message));
  }
}

// Individual exports for testing
export default function* buildingsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_BUILDINGS, getBuildings);
  yield takeLatest(CREATE_BUILDING, createBuilding);
}
