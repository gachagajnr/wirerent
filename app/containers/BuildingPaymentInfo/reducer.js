/*
 *
 * BuildingPaymentInfo reducer
 *
 */
import produce from 'immer';
import {
  GET_B_PAY_INFO,
  GET_B_PAY_INFO_SUCCESS,
  GET_B_PAY_INFO_ERROR,
  CREATE_B_PAY_INFO,
  CREATE_B_PAY_INFO_SUCCESS,
  CREATE_B_PAY_INFO_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: '',
  data: '',
  b_payinfo_res: '',
  id: '',
  payinfo: '',
};
/* eslint-disable default-case, no-param-reassign */
const buildingPaymentInfoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_B_PAY_INFO:
        draft.id = action.id;
        draft.loading = true;
        break;
      case GET_B_PAY_INFO_SUCCESS:
        draft.payinfo = action.payinfo;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_B_PAY_INFO_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case CREATE_B_PAY_INFO:
        draft.data = action.data;
        draft.loading = true;
        break;
      case CREATE_B_PAY_INFO_SUCCESS:
        draft.payinfo = action.payinfo;
        draft.loading = false;
        draft.error = '';
        break;
      case CREATE_B_PAY_INFO_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default buildingPaymentInfoReducer;
