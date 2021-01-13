import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { VERIFY_RECEIPT, GET_TRANSACTIONS, REQUEST_RECEIPT } from './constants';
import {
  getTransactionsSuccess,
  getTransactionsError,
  verifyReceiptSuccess,
  verifyReceiptError,
  requestReceiptSuccess,
  requestReceiptError,
} from './actions';

import { fetchTransactions, verifyReceipt, requestReceipt } from './api';

function* getTransactions(organization) {
  try {
    const res = yield call(fetchTransactions, organization);
    yield put(getTransactionsSuccess(res.data));
  } catch (err) {
    yield put(getTransactionsError(err.message));
  }
}
function* verifyTReceipt(id) {
  try {
    const res = yield call(verifyReceipt, id);
    yield put(verifyReceiptSuccess(res));
  } catch (err) {
    yield put(verifyReceiptError(err.message));
  }
}

function* requestTReceipt(id) {
  try {
    const res = yield call(requestReceipt, id);
    yield put(requestReceiptSuccess(res));
  } catch (err) {
    yield put(requestReceiptError(err.message));
  }
}

// Individual exports for testing
export default function* transactionsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_TRANSACTIONS, getTransactions);
  yield takeLatest(VERIFY_RECEIPT, verifyTReceipt);
  yield takeLatest(REQUEST_RECEIPT, requestTReceipt);
}
