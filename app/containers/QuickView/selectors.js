import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the quickView state domain
 */

const selectQuickViewDomain = state => state.quickView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by QuickView
 */

const makeSelectQuickView = () =>
  createSelector(
    selectQuickViewDomain,
    substate => substate,
  );

export default makeSelectQuickView;
export { selectQuickViewDomain };
