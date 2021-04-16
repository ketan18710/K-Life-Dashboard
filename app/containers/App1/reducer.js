/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { API_CONSTANTS } from '../../utils/constants';
import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR, GET_DATA, SET_DATA } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  config : {
    status : API_CONSTANTS.init,
    data : null
  }
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case GET_DATA : {
        draft.config.status = API_CONSTANTS.loading
        break;
      }
      case SET_DATA : {
        draft.config.status = payload.status;
        draft.config.data = payload.data;
        break;
      }
    }
  });
export default appReducer;
