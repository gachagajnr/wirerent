import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { GET_B_NOTICES, CREATE_B_NOTICE } from './constants';
import {
  getB_NoticesSuccess,
  getB_NoticesError,
  createB_NoticeSuccess,
  createB_NoticeError,
} from './actions';

import { fetchB_Notices, newB_Notice } from './api';

function* getB_Notices(id) {
  try {
    const res = yield call(fetchB_Notices, id);
    console.log(res.data);
    yield put(getB_NoticesSuccess(res.data));
  } catch (err) {
    yield put(getB_NoticesError(err.message));
  }
}

function* createB_Notice(data) {
  try {
    const res = yield call(newB_Notice, data);
    console.log(res);
    yield put(createB_NoticeSuccess(res));
  } catch (err) {
    yield put(createB_NoticeError(err.message));
  }
}
// Individual exports for testing
export default function* buildingNoticesSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_B_NOTICES, getB_Notices);
  yield takeLatest(CREATE_B_NOTICE, createB_Notice);
}
