/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION,GET_DATA, SET_DATA,SAVE_DATA,SAVE_DATA_RESULT, SAVE_IMAGE, SAVE_IMAGE_RESULT, GET_LOGIN, SET_LOGIN, GET_RESET_PASSWORD, SET_RESET_PASSWORD, RESET_UPLOAD_IMAGE } from './constants';
import { API_CONSTANTS } from '../../utils/constants';
export const initialState = {
  config : {
    status : API_CONSTANTS.init,
    data : null
  },
  save : {
    status : API_CONSTANTS.init,
    data : null
  },
  imageUpload : {
    status : API_CONSTANTS.init,
    data : null
  },
  login : {
    status : API_CONSTANTS.init,
    data : null
  },
  reset : {
    status : API_CONSTANTS.init,
    data : null
  },
  
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState,  { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case DEFAULT_ACTION:
        draft.login.status = API_CONSTANTS.init;
        draft.login.data = null;
        draft.config.status = API_CONSTANTS.init;
        draft.config.data = null;
        draft.save.status = API_CONSTANTS.init;
        draft.save.data = null;
        draft.imageUpload.status = API_CONSTANTS.init;
        draft.imageUpload.data = null;
        draft.reset.status = API_CONSTANTS.init;
        draft.reset.data = null;
        break;
      case RESET_UPLOAD_IMAGE : {
        draft.imageUpload.status = API_CONSTANTS.init;
        draft.imageUpload.data = null;
        break;
      }
      case GET_DATA : {
        draft.config.status = API_CONSTANTS.loading
        break;
      }
      case SET_DATA : {
        draft.config.status = payload.status;
        draft.config.data = payload.data;
        break;
      }
      case GET_LOGIN : {
        draft.login.status = API_CONSTANTS.loading
        break;
      }
      case SET_LOGIN : {
        draft.login.status = payload.status;
        draft.login.data = payload.data;
        break;
      }
      case GET_RESET_PASSWORD: {
        draft.reset.status = API_CONSTANTS.loading
        break;
      }
      case SET_RESET_PASSWORD : {
        draft.reset.status = payload.status;
        draft.reset.data = payload.data;
        break;
      }
      case SAVE_DATA : {
        draft.save.status = API_CONSTANTS.loading
        break;
      }
      case SAVE_DATA_RESULT : {
        draft.save.status = payload.status;
        draft.save.data = payload.data;
        break;
      }
      case SAVE_IMAGE : {
        draft.imageUpload.status = API_CONSTANTS.loading
        break;
      }
      case SAVE_IMAGE_RESULT : {
        draft.imageUpload.status = payload.status;
        draft.imageUpload.data = payload.data;
        break;
      }
    }
  });

export default appReducer;
