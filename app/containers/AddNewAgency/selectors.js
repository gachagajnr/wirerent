import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addNewAgency state domain
 */

const selectAddNewAgencyDomain = state => state.addNewAgency || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddNewAgency
 */

const makeSelectAddNewAgency = () =>
  createSelector(
    selectAddNewAgencyDomain,
    substate => substate.agency,
  );

export { selectAddNewAgencyDomain, makeSelectAddNewAgency };
