import {
  GET_BUILDING,
  GET_BUILDING_ERROR,
  GET_BUILDING_SUCCESS,
} from './constants';

/*
 *
 * Building reducer
 *
 */
import produce from 'immer';

export const initialState = {
         id: '',
         building: {
           _id: '',
           bills: '',
           miscellaneous: '',
           name: '',
           phone: '',
           location: '',
           description: '',
           floors: '',
           street: '',
           payment: '',
           caretakerName: '',
           caretakerPhone: '',
           utypes: '',
           code: '',
           admins: { data: [{ length: 0 }] },
           rooms: { data: [{ length: 0 }] },
           chats: { data: [{ length: 0 }] },
           teams: { data: [{ length: 0 }] },
           emails: { data: [{ length: 0 }] },
           notices: { data: [{ length: 0 }] },
           vacants: { data: [{ length: 0 }] },
           requests: { data: [{ length: 0 }] },

           contacts: { data: [{ length: 0 }] },
           tenants: { data: [{ length: 0 }] },
           receipts: { data: [{ length: 0 }] },
           sms: { data: [{ length: 0 }] },
         },
         error: '',
         loading: false,
       };

/* eslint-disable default-case, no-param-reassign */
const buildingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_BUILDING:
        draft.id = action.id;
        draft.loading = false;
        break;
      case GET_BUILDING_SUCCESS:
        draft.building._id = action.building._id;
        draft.building.bills = action.building.bills;
        draft.building.code = action.building.code;

        draft.building.miscellaneous = action.building.miscellaneous;
        draft.building.name = action.building.name;
        draft.building.location = action.building.location;
        draft.building.description = action.building.description;
        draft.building.floors = action.building.floors;
        draft.building.utypes = action.building.utypes;
        draft.building.street = action.building.street;
        draft.building.payment = action.building.payment;
        draft.building.caretakerName = action.building.caretakerName;
        draft.building.caretakerPhone = action.building.caretakerPhone;
        draft.building.admins = action.building.admins.data;
        draft.building.rooms = action.building.rooms.data;
        draft.building.chats = action.building.chats.data;
        draft.building.vacants = action.building.vacants.data;

        draft.building.teams = action.building.teams.data;
        draft.building.emails = action.building.emails.data;
        draft.building.notices = action.building.notices.data;
        draft.building.requests = action.building.requests.data;
        draft.building.contacts = action.building.contacts.data;
        draft.building.tenants = action.building.tenants.data;
        draft.building.receipts = action.building.receipts.data;
        draft.building.sms = action.building.sms.data;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_BUILDING_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default buildingReducer;
