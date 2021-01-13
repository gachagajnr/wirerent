/*
 *
 * Agency reducer
 *
 */
import {
  ADD_AGENCY,
  ADD_AGENCY_ERROR,
  ADD_AGENCY_SUCCESS,
  GET_AGENCY,
  GET_AGENCY_ERROR,
  GET_AGENCY_SUCCESS,
} from './constants';

import { notification } from 'antd';
import produce from 'immer';

export const initialState = {
  loading: false,
  organization: '',
  agency: {
    _id: '',
    name: '',
    address: '',
    email: '',
    website: '',
    phone: '',
    city: '',
    headquarters: '',
    street: '',
    buildings: { data: [{ length: 0 }] },
    admins: { data: [{ length: 0 }] },
    rooms: { data: [{ length: 0 }] },
    teams: { data: [{ length: 0 }] },
    sms: { data: [{ length: 0 }] },
    emails: { data: [{ length: 0 }] },
    notices: { data: [{ length: 0 }] },
    moving: { data: [{ length: 0 }] },
    vtransactions: { data: [{ length: 0 }] },
    single_sms: { data: [{ length: 0 }] },
    single_emails: { data: [{ length: 0 }] },
    rtransactions: { data: [{ length: 0 }] },
    requests: { data: [{ length: 0 }] },
    inventory: { data: [{ length: 0 }] },
    tenants: { data: [{ length: 0 }] },
    receipts: { data: [{ length: 0 }] },
    vacants: { data: [{ length: 0 }] },
    transactions: { data: [{ length: 0 }] },
  },
  data: '',
};

/* eslint-disable default-case, no-param-reassign */
const agencyReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_AGENCY:
        draft.loading = true;
        draft.organization = action.organization;
        break;
      case GET_AGENCY_SUCCESS:
        draft.loading = false;
        draft.agency.name = action.agency.name;
        draft.agency._id = action.agency._id;
        draft.agency.city = action.agency.city;
        draft.agency.headquarters = action.agency.headquarters;
        draft.agency.street = action.agency.street;

        draft.agency.address = action.agency.address;
        draft.agency.email = action.agency.email;
        draft.agency.website = action.agency.website;
        draft.agency.phone = action.agency.phone;
        draft.agency.buildings = action.agency.buildings.data;
        draft.agency.rooms = action.agency.rooms.data;
        draft.agency.teams = action.agency.teams.data;
        draft.agency.vtransactions = action.agency.vtransactions.data;
        draft.agency.rtransactions = action.agency.rtransactions.data;
        draft.agency.single_sms = action.agency.single_sms.data;
        draft.agency.single_emails = action.agency.single_emails.data;

        draft.agency.admins = action.agency.admins.data;
        draft.agency.emails = action.agency.emails.data;
        draft.agency.sms = action.agency.sms.data;
        draft.agency.notices = action.agency.notices.data;
        draft.agency.requests = action.agency.requests.data;
        draft.agency.vacants = action.agency.vacants.data;
        draft.agency.tenants = action.agency.tenants.data;
        draft.agency.moving = action.agency.moving.data;

        draft.agency.transactions = action.agency.transactions.data;

        break;
      case GET_AGENCY_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case ADD_AGENCY:
        draft.data = action.data;
        draft.loading = true;
        break;
      case ADD_AGENCY_SUCCESS:
        draft.loading = false;
        draft.agency = action.agency;
        draft.error = '';
        notification.success('Agency Created Successfully');
        break;
      case ADD_AGENCY_ERROR:
        draft.loading = false;
        draft.error = action.error;
        notification.error('Agency Creation Failed');
        break;
    }
  });

export default agencyReducer;
