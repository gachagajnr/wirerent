/*
 *
 * NewBuildingAdmin reducer
 *
 */
import produce from 'immer';
import { CREATE_B_ADMIN } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const newBuildingAdminReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case CREATE_B_ADMIN:
        break;
    }
  });

export default newBuildingAdminReducer;
