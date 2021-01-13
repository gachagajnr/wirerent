import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the unit state domain
 */

const selectUnitDomain = state => state.unit || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Unit
 */
const makeSelectUnit = () =>
  createSelector(
    selectUnitDomain,
    substate => substate.unit,
  );
const makeSelectNotices = () =>
  createSelector(
    selectUnitDomain,
    substate => substate.unit.notices,
  );
const makeSelectContacts = () =>
  createSelector(
    selectUnitDomain,
    substate => substate.unit.contacts,
  );
const makeSelectAlerts = () =>
  createSelector(
    selectUnitDomain,
    substate => substate.unit.alerts,
  );
const makeSelectChatrooms = () =>
  createSelector(
    selectUnitDomain,
    substate => substate.unit.chatrooms,
  );
const makeSelectRequests = () =>
  createSelector(
    selectUnitDomain,
    substate => substate.unit.requests,
  );
const makeSelectReceipts = () =>
  createSelector(
    selectUnitDomain,
    substate => substate.unit.receipts,
  );
const makeSelectUnitIdentity = () =>
  createSelector(
    selectUnitDomain,
    substate => substate.unit.identity,
  );
const makeSelectUBName = () =>
  createSelector(
    selectUnitDomain,
    substate => substate.unit.building_name,
  );
const makeSelectTenant = () =>
  createSelector(
    selectUnitDomain,
    substate => substate.unit.tenant,
  );
export {
  selectUnitDomain,
  makeSelectUnit,
  makeSelectNotices,
  makeSelectContacts,
  makeSelectAlerts,
  makeSelectChatrooms,
  makeSelectRequests,
  makeSelectReceipts,
  makeSelectUnitIdentity,
  makeSelectUBName,
  makeSelectTenant,
};
