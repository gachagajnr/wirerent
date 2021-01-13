/*
 *
 * Transactions actions
 *
 */

import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_ERROR,
  GET_TRANSACTIONS_SUCCESS,
  REQUEST_RECEIPT,
  REQUEST_RECEIPT_ERROR,
  REQUEST_RECEIPT_SUCCESS,
  VERIFY_RECEIPT,
  VERIFY_RECEIPT_ERROR,
  VERIFY_RECEIPT_SUCCESS,
} from './constants';

export function getTransactions(organization, time) {
  return {
    type: GET_TRANSACTIONS,
    organization,time
  };
}

export function getTransactionsSuccess(transactions) {
  return {
    type: GET_TRANSACTIONS_SUCCESS,
    transactions,
  };
}
export function getTransactionsError(error) {
  return {
    type: GET_TRANSACTIONS_ERROR,
    error,
  };
}
export function verifyReceipt(id) {
  return {
    type: VERIFY_RECEIPT,
    id,
  };
}

export function verifyReceiptSuccess(receipt) {
  return {
    type: VERIFY_RECEIPT_SUCCESS,
    receipt,
  };
}
export function verifyReceiptError(error) {
  return {
    type: VERIFY_RECEIPT_ERROR,
    error,
  };
}

export function requestReceipt(id) {
  return {
    type: REQUEST_RECEIPT,
    id,
  };
}

export function requestReceiptSuccess(receipt) {
  return {
    type: REQUEST_RECEIPT_SUCCESS,
    receipt,
  };
}
export function requestReceiptError(error) {
  return {
    type: REQUEST_RECEIPT_ERROR,
    error,
  };
}
