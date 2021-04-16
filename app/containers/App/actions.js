/*
 *
 * App actions
 *
 */

import { DEFAULT_ACTION, GET_DATA,SET_DATA,SAVE_DATA,SAVE_DATA_RESULT, SAVE_IMAGE, SAVE_IMAGE_RESULT, GET_LOGIN, SET_LOGIN, GET_RESET_PASSWORD, SET_RESET_PASSWORD, RESET_UPLOAD_IMAGE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export const resetUploadImage = () => {
  debugger
  return({
    type: RESET_UPLOAD_IMAGE,
  })
}
export const getData = () => ({
  type: GET_DATA,
})
export const setData = data => ({
  type: SET_DATA,
  payload: data
})
export const getLgin = data => ({
  type: GET_LOGIN,
  payload: data
})
export const setLgin = data => ({
  type: SET_LOGIN,
  payload: data
})
export const getResetPAssword = data => ({
  type: GET_RESET_PASSWORD,
  payload: data
})
export const setResetPAssword = data => ({
  type: SET_RESET_PASSWORD,
  payload: data
})
export const saveData = data => ({
  type: SAVE_DATA,
  payload: data
})
export const saveDataResult = data => ({
  type: SAVE_DATA_RESULT,
  payload: data
})
export const saveImage = data => ({
  type: SAVE_IMAGE,
  payload: data
})
export const saveImageResult = data => ({
  type: SAVE_IMAGE_RESULT,
  payload: data
})