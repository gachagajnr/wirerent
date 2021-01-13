import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the buildingTransactions state domain
 */

const selectBuildingTransactionsDomain = state =>
  state.buildingTransactions || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BuildingTransactions
 */

const makeSelectBuildingTransactions = () =>
  createSelector(
    selectBuildingTransactionsDomain,
    substate => substate.transactions,
  );

export { selectBuildingTransactionsDomain, makeSelectBuildingTransactions };
