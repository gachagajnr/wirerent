import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the unitTransactions state domain
 */

const selectUnitTransactionsDomain = state =>
  state.unitTransactions || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UnitTransactions
 */

const makeSelectUnitTransactions = () =>
  createSelector(
    selectUnitTransactionsDomain,
    substate => substate.unitTransactions,
  );

export { selectUnitTransactionsDomain, makeSelectUnitTransactions };
