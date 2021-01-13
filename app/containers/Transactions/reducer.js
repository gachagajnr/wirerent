import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_ERROR,
  GET_TRANSACTIONS_SUCCESS,
  REQUEST_RECEIPT,
  REQUEST_RECEIPT_ERROR,
  REQUEST_RECEIPT_SUCCESS,
  VERIFY_RECEIPT,
  VERIFY_RECEIPT_ERROR,
  VERIFY_RECEIPT_SUCCESS,
} from './constants';

/*
 *
 * Transactions reducer
 *
 */
import produce from 'immer';

export const initialState = {
  transactions: [],
  loading: false,
  error: '',
  organization: '',
  time:'',
  id: '',
  receipt: '',
};

/* eslint-disable default-case, no-param-reassign */
const transactionsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_TRANSACTIONS:
        draft.organization = action.organization;
        draft.time=action.time;
        draft.loading = true;
        break;
      case GET_TRANSACTIONS_SUCCESS:
        draft.transactions = action.transactions;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_TRANSACTIONS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case VERIFY_RECEIPT:
        draft.id = action.id;
        draft.loading = true;
        break;
      case VERIFY_RECEIPT_SUCCESS:
        draft.receipt = action.receipt;
        draft.loading = false;
        draft.error = '';
        break;
      case VERIFY_RECEIPT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case REQUEST_RECEIPT:
        draft.id = action.id;
        draft.loading = true;
        break;
      case REQUEST_RECEIPT_SUCCESS:
        draft.receipt = action.receipt;
        draft.loading = false;
        draft.error = '';
        break;
      case REQUEST_RECEIPT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default transactionsReducer;
