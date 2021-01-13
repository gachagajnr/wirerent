import {
  GET_ROOMS,
  GET_ROOMS_ERROR,
  GET_ROOMS_SUCCESS,
  SEND_EMAIL,
  SEND_EMAIL_ERROR,
  SEND_EMAIL_SUCCESS,
  SEND_SMS,
  SEND_SMS_ERROR,
  SEND_SMS_SUCCESS,
} from './constants';

/*
 *
 * BuildingUnits reducer
 *
 */
import produce from 'immer';

export const initialState = {
         loading: false,
         units: [],
         error: '',
         id: '',
         isVacant: '',
         data: '',
         email: '',
         sms: '',
       };
/* eslint-disable default-case, no-param-reassign */
const buildingUnitsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ROOMS:
        draft.id = action.id;
        draft.isVacant = action.isVacant;
        draft.loading = true;
        break;
      case GET_ROOMS_SUCCESS:
        draft.units = action.units;
        draft.loading = false;
        break;
      case GET_ROOMS_ERROR:
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
    }
  });

export default buildingUnitsReducer;
