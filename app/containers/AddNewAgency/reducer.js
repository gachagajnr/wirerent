import { ADD_AGENCY, ADD_AGENCY_ERROR, ADD_AGENCY_SUCCESS } from './constants';

import { message } from 'antd';
/*
 *
 * AddNewAgency reducer
 *
 */
import produce from 'immer';

export const initialState = {
  agency: {},
  data: '',
  loading: false,
  organization: '',
  error: '',
};
/* eslint-disable default-case, no-param-reassign */
const addNewAgencyReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_AGENCY:
        draft.data = action.data;
        draft.loading = true;
        break;
      case ADD_AGENCY_SUCCESS:
        draft.loading = false;
        draft.agency = action.agency;
        draft.error = '';
        message.success('Successfully Created Agency');
        break;
      case ADD_AGENCY_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default addNewAgencyReducer;
