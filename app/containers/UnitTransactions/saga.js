import {
  CREATE_TRANSACTION,
  GET_TRANSACTIONS,
  UPLOAD_RECEIPT,
} from './constants';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  createTransactionError,
  createTransactionSuccess,
  getTransactionsError,
  getTransactionsSuccess,
  uploadReceiptError,
  uploadReceiptSuccess,
} from './actions';
import { fetchTransactions, newReceipt, newTransaction } from './api';

function* getTransactions(id) {
  try {
    const res = yield call(fetchTransactions, id);
    yield put(getTransactionsSuccess(res.data));
  } catch (err) {
    yield put(getTransactionsError(err.message));
  }
}

function* createTransaction(data) {
   try {
    const res = yield call(newTransaction, data);
     yield put(createTransactionSuccess(res));
  } catch (err) {
    yield put(createTransactionError(err.message));
  }
}

function* uploadReceipt(receipt) {
  try {
    const res = yield call(newReceipt, receipt);
    yield put(uploadReceiptSuccess(res));
  } catch (err) {
    yield put(uploadReceiptError(err.message));
  }
}
// Individual exports for testing
export default function* unitTransactionsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(CREATE_TRANSACTION, createTransaction);
  yield takeLatest(GET_TRANSACTIONS, getTransactions);
  yield takeLatest(UPLOAD_RECEIPT, uploadReceipt);
}
