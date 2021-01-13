import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { GET_TRANSACTIONS } from './constants';
import { getTransactionsSuccess, getTransactionsError } from './actions';

import { fetchTransactions } from './api';

function* getTransactions(id) {
  try {
    const res = yield call(fetchTransactions, id);
    console.log(res);
    yield put(getTransactionsSuccess(res.data));
  } catch (err) {
    yield put(getTransactionsError(err.message));
  }
}
// Individual exports for testing
export default function* buildingTransactionsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_TRANSACTIONS, getTransactions);
}
