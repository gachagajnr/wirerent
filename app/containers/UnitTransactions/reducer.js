import {
  CREATE_TRANSACTION,
  CREATE_TRANSACTION_ERROR,
  CREATE_TRANSACTION_SUCCESS,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_ERROR,
  GET_TRANSACTIONS_SUCCESS,
  UPLOAD_RECEIPT,
  UPLOAD_RECEIPT_ERROR,
  UPLOAD_RECEIPT_SUCCESS,
} from './constants';

/*
 *
 * UnitTransactions reducer
 *
 */
import produce from 'immer';

export const initialState = {
  loading: false,
  transaction: '',
  data: '',
  author: '',
  id: '',
  error: '',
  unitTransactions: [],
  receipt: '',
};
/* eslint-disable default-case, no-param-reassign */
const unitTransactionsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_TRANSACTION:
        draft.data = action.data;
        draft.loading = false;
        break;
      case CREATE_TRANSACTION_SUCCESS:
        draft.transaction = action.transaction;
        draft.loading = false;
        draft.error = '';
        break;
      case CREATE_TRANSACTION_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case GET_TRANSACTIONS:
        draft.id = action.id;
        draft.author = action.author;
        draft.loading = false;
        break;
      case GET_TRANSACTIONS_SUCCESS:
        draft.unitTransactions = action.unitTransactions;
        draft.loading = false;
        draft.error = '';
        break;
      case GET_TRANSACTIONS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case UPLOAD_RECEIPT:
        draft.receipt = action.receipt;
        draft.loading = false;
        break;
      case UPLOAD_RECEIPT_SUCCESS:
        draft.receipt = action.receipt;
        draft.loading = false;
        draft.error = '';
        break;
      case UPLOAD_RECEIPT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default unitTransactionsReducer;
