import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the transactions state domain
 */

const selectTransactionsDomain = state => state.transactions || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Transactions
 */

const makeSelectTransactions = () =>
  createSelector(
    selectTransactionsDomain,
    substate => substate.transactions,
  );

export { selectTransactionsDomain, makeSelectTransactions };
