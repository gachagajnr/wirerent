import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the building state domain
 */

const selectBuildingDomain = state => state.building || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Building
 */

const makeSelectBuilding = () =>
  createSelector(
    selectBuildingDomain,
    substate => substate.building,
  );
const makeSelectName = () =>
  createSelector(
    selectBuildingDomain,
    substate => substate.building.name,
  );
const makeSelectAdmins = () =>
  createSelector(
    selectBuildingDomain,
    substate => substate.building.admins,
  );
const makeSelectChats = () =>
  createSelector(
    selectBuildingDomain,
    substate => substate.building.chats,
  );
const makeSelectContacts = () =>
  createSelector(
    selectBuildingDomain,
    substate => substate.building.contacts,
  );
const makeSelectEmails = () =>
  createSelector(
    selectBuildingDomain,
    substate => substate.building.emails,
  );
const makeSelectNotices = () =>
  createSelector(
    selectBuildingDomain,
    substate => substate.building.notices,
  );
const makeSelectReceipts = () =>
  createSelector(
    selectBuildingDomain,
    substate => substate.building.receipts,
  );
const makeSelectTeams = () =>
  createSelector(
    selectBuildingDomain,
    substate => substate.building.teams,
  );
const makeSelectRooms = () =>
  createSelector(
    selectBuildingDomain,
    substate => substate.building.rooms,
  );
const makeSelectSms = () =>
  createSelector(
    selectBuildingDomain,
    substate => substate.building.sms,
  );
const makeSelectTenants = () =>
  createSelector(
    selectBuildingDomain,
    substate => substate.building.tenants,
  );
const makeSelectRequests = () =>
  createSelector(
    selectBuildingDomain,
    substate => substate.building.requests,
  );
const makeSelectPayment = () =>
  createSelector(
    selectBuildingDomain,
    substate => substate.building.payment,
  );
export {
  selectBuildingDomain,
  makeSelectBuilding,
  makeSelectName,
  makeSelectAdmins,
  makeSelectChats,
  makeSelectContacts,
  makeSelectEmails,
  makeSelectNotices,
  makeSelectReceipts,
  makeSelectTeams,
  makeSelectRooms,
  makeSelectSms,
  makeSelectTenants,
  makeSelectRequests,
  makeSelectPayment,
};
