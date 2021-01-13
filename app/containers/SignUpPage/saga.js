import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { SIGNUP } from './constants';
import { signupSuccess, signupError } from './actions';
import { createUser } from './api';

function* signUpUser(data) {
  try {
    const user = yield call(createUser, data);
    yield put(signupSuccess(user));
  } catch (error) {
    yield put(signupError(error.message));
  }
}
// Individual exports for testing
export default function* signUpPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SIGNUP, signUpUser);
}
