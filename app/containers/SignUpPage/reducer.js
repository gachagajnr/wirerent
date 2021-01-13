/*
 *
 * SignUpPage reducer
 *
 */
import produce from 'immer';
import { SIGNUP, SIGNUP_SUCCESS, SIGNUP_ERROR } from './constants';

export const initialState = {
  user: '',
  data: '',
  loading: false,
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const signUpPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIGNUP:
        draft.data = action.data;
        draft.loading = true;
        break;
      case SIGNUP_SUCCESS:
        draft.user = action.user;
        draft.loading = false;
        draft.error = '';
        break;
      case SIGNUP_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default signUpPageReducer;
