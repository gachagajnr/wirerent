import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newBuildingContact state domain
 */

const selectNewBuildingContactDomain = state =>
  state.newBuildingContact || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewBuildingContact
 */

const makeSelectNewBuildingContact = () =>
  createSelector(
    selectNewBuildingContactDomain,
    substate => substate,
  );

export default makeSelectNewBuildingContact;
export { selectNewBuildingContactDomain };
