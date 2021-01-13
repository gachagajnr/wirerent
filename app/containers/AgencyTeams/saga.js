import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { GET_A_TEAMS, CREATE_A_TEAM } from './constants';
import {
  getA_TeamsSuccess,
  getA_TeamsError,
  createA_TeamSuccess,
  createA_TeamError,
} from './actions';

import { fetchA_Teams, createA_Team } from './api';

function* getA_Teams(id) {
  try {
    const res = yield call(fetchA_Teams, id);
    yield put(getA_TeamsSuccess(res.data));
  } catch (err) {
    yield put(getA_TeamsError(err.message));
  }
}

function* newA_Team(data) {
  try {
    const res = yield call(createA_Team, data);
    yield put(createA_TeamSuccess(res));
  } catch (err) {
    yield put(createA_TeamError(err.message));
  }
}
// Individual exports for testing
export default function* agencyTeamsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_A_TEAMS, getA_Teams);
  yield takeLatest(CREATE_A_TEAM, newA_Team);
}
