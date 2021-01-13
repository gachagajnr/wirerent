import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addUnitTransaction state domain
 */

const selectAddUnitTransactionDomain = state =>
  state.addUnitTransaction || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddUnitTransaction
 */

const makeSelectAddUnitTransaction = () =>
  createSelector(
    selectAddUnitTransactionDomain,
    substate => substate,
  );

export default makeSelectAddUnitTransaction;
export { selectAddUnitTransactionDomain };
