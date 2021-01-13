import {
  CREATE_ROOM,
  CREATE_ROOM_ERROR,
  CREATE_ROOM_SUCCESS,
  GET_ROOMS,
  GET_ROOMS_ERROR,
  GET_ROOMS_SUCCESS,
} from './constants';

import { notification } from 'antd';
/*
 *
 * Units reducer
 *
 */
import produce from 'immer';

export const initialState = {
  loading: false,
  units: [],
  unit: {},
  data: '',
  error: '',
  organization: '',
  isVacant: '',
};

/* eslint-disable default-case, no-param-reassign */
const unitsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ROOMS:
        draft.organization = action.organization;
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
      case CREATE_ROOM:
        draft.data = action.data;
        draft.loading = true;
        break;
      case CREATE_ROOM_SUCCESS:
        draft.unit = action.unit;
        draft.loading = false;
        notification.success('Room Created Successfully');
        break;
      case CREATE_ROOM_ERROR:
        draft.error = action.error;
        draft.loading = false;
        notification.error('Room Creation Failed');

        break;
    }
  });

export default unitsReducer;
