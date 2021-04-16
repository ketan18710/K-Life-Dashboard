import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_DATA } from './constants';
import {request} from 'utils/common'
import {API_CONSTANTS} from 'utils/constants'
import {setData} from './actions'
// Individual exports for testing
export default function* appSaga() {
  // See example in containers/HomePage/saga.js
  // See example in containers/App/saga.js
  yield takeLatest(GET_DATA, getDataFunc);
  // yield takeLatest(VERIFY_EMAIL,verifyEmail);  
  // yield takeLatest(EMAIL_VERIFIED_SUCCESS,emailVerifiedSuccess)
}
function* getDataFunc(){
  try{
    const userData =  yield call(
      request, 
      `http://localhost:3100/api`,
      {
          method: 'GET',
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      }
    ) 
    yield put(
      setData({
        status: API_CONSTANTS.success,
        data: userData
      }),
    );
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