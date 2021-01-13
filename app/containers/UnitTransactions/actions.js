/*
 *
 * UnitTransactions actions
 *
 */

import {
  CREATE_TRANSACTION,
  CREATE_TRANSACTION_ERROR,
  CREATE_TRANSACTION_SUCCESS,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_ERROR,
  GET_TRANSACTIONS_SUCCESS,
  UPLOAD_RECEIPT,
  UPLOAD_RECEIPT_ERROR,
  UPLOAD_RECEIPT_SUCCESS,
} from './constants';

export function getTransactions(id, author) {
  return {
    type: GET_TRANSACTIONS,
    id,
    author,
  };
}
export function getTransactionsSuccess(unitTransactions) {
  return {
    type: GET_TRANSACTIONS_SUCCESS,
    unitTransactions,
  };
}
export function getTransactionsError(error) {
  return {
    type: GET_TRANSACTIONS_ERROR,
    error,
  };
}

export function createTransaction(data) {
  return {
    type: CREATE_TRANSACTION,
    data,
  };
}
export function createTransactionSuccess(transaction) {
  return {
    type: CREATE_TRANSACTION_SUCCESS,
    transaction,
  };
}
export function createTransactionError(error) {
  return {
    type: CREATE_TRANSACTION_ERROR,
    error,
  };
}

export function uploadReceipt(receipt) {
  return {
    type: UPLOAD_RECEIPT,
    receipt,
  };
}
export function uploadReceiptSuccess(receipt) {
  return {
    type: UPLOAD_RECEIPT_SUCCESS,
    receipt,
  };
}
export function uploadReceiptError(error) {
  return {
    type: UPLOAD_RECEIPT_ERROR,
    error,
  };
}
