import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { GET_B_CONTACTS, CREATE_B_CONTACT } from './constants';
import {
  getB_ContactsSuccess,
  createB_ContactSuccess,
  getB_ContactsError,
  createB_ContactError,
} from './actions';

import { fetchB_Contacts, newB_Contact } from './api';

function* getB_Contacts(id) {
  try {
    const res = yield call(fetchB_Contacts, id);
    yield put(getB_ContactsSuccess(res.data));
  } catch (err) {
    yield put(getB_ContactsError(err.message));
  }
}
function* createB_Contact(data) {
  try {
    const res = yield call(newB_Contact, data);
    yield put(createB_ContactSuccess(res));
  } catch (err) {
    yield put(createB_ContactError(err.message));
  }
}
// Individual exports for testing
export default function* buildingContactsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_B_CONTACTS, getB_Contacts);
  yield takeLatest(CREATE_B_CONTACT, createB_Contact);
}
