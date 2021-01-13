/*
 *
 * BuildingTransactions actions
 *
 */

import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_ERROR,
} from './constants';

export function getTransactions(id) {
  return {
    type: GET_TRANSACTIONS,
    id,
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
