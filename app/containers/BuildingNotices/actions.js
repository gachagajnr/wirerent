/*
 *
 * BuildingNotices actions
 *
 */

import {
  GET_B_NOTICES,
  GET_B_NOTICES_SUCCESS,
  GET_B_NOTICES_ERROR,
  CREATE_B_NOTICE,
  CREATE_B_NOTICE_SUCCESS,
  CREATE_B_NOTICE_ERROR,
} from './constants';

export function getB_Notices(id) {
  return {
    type: GET_B_NOTICES,
    id,
  };
}

export function getB_NoticesSuccess(b_notices) {
  return {
    type: GET_B_NOTICES_SUCCESS,
    b_notices,
  };
}
export function getB_NoticesError(error) {
  return {
    type: GET_B_NOTICES_ERROR,
    error,
  };
}

export function createB_Notice(data) {
  return {
    type: CREATE_B_NOTICE,
    data,
  };
}

export function createB_NoticeSuccess(b_notice) {
  return {
    type: CREATE_B_NOTICE_SUCCESS,
    b_notice,
  };
}
export function createB_NoticeError(error) {
  return {
    type: CREATE_B_NOTICE_ERROR,
    error,
  };
}
