/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from './constants';

export const initialState = {
  user: {
    email: '',
    isAuthenticated: false,
    role: undefined,
    id: '',
    organization: '',
    isVerified: false,
    organization_name: '',
  },
  loading: false,
  error: '',
  notifications: [],
};

/* eslint-disable default-case, no-param-reassign */
export const globalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.user = action.user;
        draft.loading = true;
        break;
      case LOGIN_SUCCESS:
        draft.user = action.user;
        draft.loading = false;
        break;
      case LOGIN_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      // case LOGOUT:
      // draft.user = ;
    }
  });

// export default globalReducer
