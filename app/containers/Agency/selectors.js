import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agency state domain
 */

const selectAgencyDomain = state => state.agency || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Agency
 */

const makeSelectAgency = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.agency,
  );

const makeSelectAgencyName = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.agency.name,
  );

const makeSelectBuildings = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.agency.buildings,
  );

const makeSelectUnits = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.agency.rooms,
  );

const makeSelectAdmins = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.agency.admins,
  );

const makeSelectNotices = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.agency.notices,
  );
const makeSelectTenants = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.agency.tenants,
  );

const makeSelectTransactions = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.agency.transactions,
  );
const makeSelectSms = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.agency.sms,
  );
const makeSelectEmails = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.agency.emails,
  );
const makeSelectMoving = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.agency.moving,
  );
  const makeSelectVTransactions = () =>
    createSelector(
      selectAgencyDomain,
      substate => substate.agency.vtransactions,
    );

export {
  makeSelectAgency,
  selectAgencyDomain,
  makeSelectAgencyName,
  makeSelectBuildings,
  makeSelectUnits,
  makeSelectMoving,
  makeSelectAdmins,
  makeSelectNotices,
  makeSelectTenants,
  makeSelectTransactions,
  makeSelectEmails,
  makeSelectSms,
  makeSelectVTransactions,
};
