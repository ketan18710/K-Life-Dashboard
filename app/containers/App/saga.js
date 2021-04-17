import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_DATA,GET_LOGIN,GET_RESET_PASSWORD,SAVE_DATA, SAVE_IMAGE } from './constants';
import {request,AuthHelper} from 'utils/common'
import {API_CONSTANTS,PROD_DOMAIN,STATUS_CODES} from 'utils/constants'
import {saveDataResult, setData,saveImageResult, setLgin, setResetPAssword} from './actions'
import { DEFAULT_IMAGE_2, NO_IMAGE } from '../../utils/constants';

// Individual exports for testing
export default function* appSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_DATA, getDataFunc);
  yield takeLatest(SAVE_DATA, saveDataFunc);
  yield takeLatest(SAVE_IMAGE, saveImageFunc);
  yield takeLatest(GET_LOGIN, loginFunc);
  yield takeLatest(GET_RESET_PASSWORD, resetPasswordSagaFunc);
}
function* getDataFunc(){
  try{
    const userData =  yield call(
      request, 
      `${PROD_DOMAIN}/data/last`,
      {
          method: 'GET',
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Access-Control-Allow-Origin': '*',
          },
      }
    ) 
    console.log(userData)
    // debugger
    const {statusCode} = userData
    if(statusCode === STATUS_CODES.SUCCESS){
      yield put(
        setData({
          status: API_CONSTANTS.success,
          data: userData.data.data
        }),
      );
    }else if(statusCode === STATUS_CODES.LOGIN_EXPIRED){
      AuthHelper.logout()
    }else{
      yield put(
        setData({
          status: API_CONSTANTS.error,
          data: userData.error
        }),
      );
    }
  }catch (err) {
    // Set error state
    console.log(err);
    yield put(
      setData({
        status: API_CONSTANTS.error,
        data: err.message
      }),
    );
    debugger
    // yield put(setFetchUserData({ status: API_CONSTANTS.error }));
  }
}
function* saveDataFunc(data){
  const dataToSend = {data : JSON.stringify(data.payload)}
  try{
    const userData =  yield call(
      request, 
      `${PROD_DOMAIN}/data/publish`,
      {
          method: 'POST',
          body : JSON.stringify(dataToSend),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      }
    ) 
    const {statusCode} = userData
    if(statusCode === STATUS_CODES.SUCCESS){
      yield put(
        saveDataResult({
          status: API_CONSTANTS.success,
          data: data.payload
        }),
      );
    }else if(statusCode === STATUS_CODES.LOGIN_EXPIRED){
      AuthHelper.logout()
    }else{
      yield put(
        saveDataResult({
          status: API_CONSTANTS.error,
          data: userData.error
        }),
      );
    }
  }catch (err) {
    // Set error state
    console.log(err);
    debugger
    yield put(
      saveDataResult({
        status: API_CONSTANTS.error,
        data: err.message
      }),
    );
    // yield put(setFetchUserData({ status: API_CONSTANTS.error }));
  }
}
function* resetPasswordSagaFunc(data){
  // debugger
  try{
    const reset =  yield call(
      request, 
      `${PROD_DOMAIN}/user/passwordreset`,
      {
          method: 'PATCH',
          body : JSON.stringify(data.payload),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      }
    ) 
    console.log(reset,'reset')
    const {statusCode} = reset
    if(statusCode === STATUS_CODES.SUCCESS){
      yield put(
        setResetPAssword({
          status: API_CONSTANTS.success,
          data: reset.data
        }),
      );
    }else if(statusCode === STATUS_CODES.LOGIN_EXPIRED){
      AuthHelper.logout()
    }else{
      yield put(
        setResetPAssword({
          status: API_CONSTANTS.error,
          data: reset.error
        }),
      );
    }
  }catch (err) {
    // Set error state
    console.log(err);
    yield put(
      setResetPAssword({
        status: API_CONSTANTS.error,
        data: err.message
      }),
    );
    // yield put(setFetchUserData({ status: API_CONSTANTS.error }));
  }
}
function* loginFunc(data){
  try{
    const login =  yield call(
      request, 
      `${PROD_DOMAIN}/user/login`,
      {
          method: 'POST',
          body : JSON.stringify(data.payload),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      }
    ) 
    const {statusCode} = login
    if(statusCode === STATUS_CODES.SUCCESS){
      yield put(
        setLgin({
          status: API_CONSTANTS.success,
          data: login.token
        }),
      );
    }else{
      yield put(
        setLgin({
          status: API_CONSTANTS.error,
          data: login.message
        }),
      );
      
    }
  }catch (err) {
    // Set error state
    console.log(err);
    yield put(
      setLgin({
        status: API_CONSTANTS.error,
        data: err.message
      }),
    );
    // yield put(setFetchUserData({ status: API_CONSTANTS.error }));
  }
}
function* saveImageFunc(data){
  // console.log(data,'imageData')
  // // debugger
  try{
    const image =  yield call(
      request, 
      `${PROD_DOMAIN}/data/v1/upload`,
      {
          method: 'POST',
          body : data.payload,
          headers: {
              // 'Content-type': 'multipart/form-data;',
          },
      }
    ) 
    const {statusCode} = image
    if(statusCode === STATUS_CODES.SUCCESS){
      yield put(
        saveImageResult({
          status: API_CONSTANTS.success,
          data: {link :  image.image,title : image.fileName}
        }),
      );
    }else{
      yield put(
        saveImageResult({
          status: API_CONSTANTS.error,
          data: image.message
        }),
      );

    }
  }catch (err) {
    // Set error state
    console.log(err);
    debugger
    yield put(
      saveImageResult({
        status: API_CONSTANTS.error,
        data: err.message
      }),
    );
    // yield put(setFetchUserData({ status: API_CONSTANTS.error }));
  }
}