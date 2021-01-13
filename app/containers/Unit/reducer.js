/*
 *
 * Unit reducer
 *
 */
import produce from 'immer';
import {
  GET_UNIT,
  GET_UNIT_SUCCESS,
  GET_UNIT_ERROR,
  REQ_MOVE,
  REQ_MOVE_SUCCESS,
  REQ_MOVE_ERROR,
  NOTIFY,
  NOTIFY_SUCCESS,
  NOTIFY_ERROR,
  CANCEL_MOVE,
  CANCEL_MOVE_SUCCESS,
  CANCEL_MOVE_ERROR,
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SEND_SMS,
  SEND_SMS_SUCCESS,
  SEND_SMS_ERROR,
  REMOVE_TENANT,
  REMOVE_TENANT_SUCCESS,
  REMOVE_TENANT_ERROR,
} from './constants';

export const initialState = {
  id: '',
  unit: {
    _id: '',
    features: '',
    bills: '',
    identity: '',
    floor: '',
    rent: '',
    meterno: '',
    type: '',
    isOccupied: '',
    type: '',
    building_name: '',
    moveoutRequested: '',
    user: '',
    payment: {
      accountNumber: '',
      accountName: '',
      mode: '',
      bank: '',
      branch: '',
      description: '',
    },
    notices: { data: [{ length: 0 }] },
    contacts: { data: [{ length: 0 }] },
    alerts: { data: [{ length: 0 }] },
    chatrooms: { data: [{ length: 0 }] },
    requests: { data: [{ length: 0 }] },
    receipts: { data: [{ length: 0 }] },
  },
  room: '',
  mroom: '',
  data: '',
  sms: '',
  email: '',
  error: '',
  remove: '',
  notice: '',
  loading: false,
};
/* eslint-disable default-case, no-param-reassign */
const unitReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_UNIT:
        draft.id = action.id;
        draft.loading = false;
        break;
      case GET_UNIT_SUCCESS:
        draft.unit._id = action.unit._id;
        draft.unit.features = action.unit.features;
        draft.unit.moveoutRequested = action.unit.moveoutRequested;

        draft.unit.identity = action.unit.identity;
        draft.unit.floor = action.unit.floor;
        draft.unit.type = action.unit.type;

        draft.unit.rent = action.unit.rent;
        draft.unit.isOccupied = action.unit.isOccupied;
        draft.unit.type = action.unit.type;
        draft.unit.building_name = action.unit.building_name;
        draft.unit.user = action.unit.user;
        draft.unit.payment = action.unit.payment;
        draft.unit.notices = action.unit.notices.data;
        draft.unit.contacts = action.unit.contacts.data;
        draft.unit.alerts = action.unit.alerts.data;
        draft.unit.chatrooms = action.unit.chatrooms.data;
        draft.unit.requests = action.unit.requests.data;
        draft.unit.bills = action.unit.bills;
        draft.unit.meterno = action.unit.meterno;

        draft.unit.receipts = action.unit.receipts.data;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_UNIT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case REQ_MOVE:
        draft.room = action.room;
        draft.loading = true;
        break;
      case REQ_MOVE_SUCCESS:
        draft.mroom = action.mroom;
        draft.loading = false;
        draft.error = '';
        break;
      case REQ_MOVE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case NOTIFY:
        draft.notice = action.notice;
        draft.loading = true;
        break;
      case NOTIFY_SUCCESS:
        draft.notice = action.notice;
        draft.loading = false;
        draft.error = '';
        break;
      case NOTIFY_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case CANCEL_MOVE:
        draft.room = action.room;
        draft.loading = true;
        break;
      case CANCEL_MOVE_SUCCESS:
        draft.room = action.room;
        draft.loading = false;
        draft.error = '';
        break;
      case CANCEL_MOVE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case SEND_SMS:
        draft.data = action.data;
        draft.loading = true;
        break;
      case SEND_SMS_SUCCESS:
        draft.sms = action.sms;
        draft.loading = false;
        draft.error = '';
        break;
      case SEND_SMS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case SEND_EMAIL:
        draft.data = action.data;
        draft.loading = true;
        break;
      case SEND_EMAIL_SUCCESS:
        draft.email = action.email;
        draft.loading = false;
        draft.error = '';
        break;
      case SEND_EMAIL_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case REMOVE_TENANT:
        draft.id = action.id;
        draft.loading = true;
        break;
      case REMOVE_TENANT_SUCCESS:
        draft.remove = action.remove;
        draft.loading = false;
        draft.error = '';
        break;
      case REMOVE_TENANT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default unitReducer;
