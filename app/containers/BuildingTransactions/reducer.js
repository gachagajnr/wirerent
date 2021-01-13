/*
 *
 * BuildingTransactions reducer
 *
 */
import produce from 'immer';
import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_ERROR,
} from './constants';

export const initialState = {
  transactions: [],
  loading: false,
  error: '',
  id: '',
};

/* eslint-disable default-case, no-param-reassign */
const buildingTransactionsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_TRANSACTIONS:
        draft.id = action.id;
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
    }
  });

export default buildingTransactionsReducer;
