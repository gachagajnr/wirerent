import {
  CREATE_BUILDING,
  CREATE_BUILDING_ERROR,
  CREATE_BUILDING_SUCCESS,
  GET_BUILDINGS,
  GET_BUILDINGS_ERROR,
  GET_BUILDINGS_SUCCESS,
} from './constants';

import { notification } from 'antd';
/*
 *
 * Buildings reducer
 *
 */
import produce from 'immer';

export const initialState = {
  loading: false,
  error: '',
  organization: '',
  buildings: [],
  data: '',
  building: '',
};

/* eslint-disable default-case, no-param-reassign */
const buildingsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_BUILDINGS:
        draft.organization = action.organization;
        draft.loading = false;
        break;
      case GET_BUILDINGS_SUCCESS:
        draft.buildings = action.buildings;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_BUILDINGS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case CREATE_BUILDING:
        draft.data = action.data;
        draft.loading = true;
        break;
      case CREATE_BUILDING_SUCCESS:
        draft.buildings.push(action.building);
        draft.loading = false;
        draft.error = '';
        notification.success('Building Created Successfully');
        break;
      case CREATE_BUILDING_ERROR:
        draft.error = action.error;
        draft.loading = false;
        notification.error('Building Create Failed');

        break;
    }
  });

export default buildingsReducer;
