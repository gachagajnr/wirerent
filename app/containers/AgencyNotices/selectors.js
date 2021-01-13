import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agencyNotices state domain
 */

const selectAgencyNoticesDomain = state => state.agencyNotices || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AgencyNotices
 */

const makeSelectAgencyNotices = () =>
  createSelector(
    selectAgencyNoticesDomain,
    substate => substate,
  );

export default makeSelectAgencyNotices;
export { selectAgencyNoticesDomain };
