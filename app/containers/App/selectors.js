import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the app state domain
 */

const selectAppDomain = state => state.app || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by App
 */

const makeSelectApp = () =>
  createSelector(
    selectAppDomain,
    substate => substate,
  );
const  makeSelectConfig = () =>
  createSelector(
    selectAppDomain,
    substate => substate.config,
  );
const  makeSelectSave = () =>
  createSelector(
    selectAppDomain,
    substate => substate.save,
  );
const  makeSelectResetPassword = () =>
  createSelector(
    selectAppDomain,
    substate => substate.reset,
  );
const  makeSelectLogin = () =>
  createSelector(
    selectAppDomain,
    substate => substate.login,
  );
const  makeSelectImageUpload = () =>
  createSelector(
    selectAppDomain,
    substate => substate.imageUpload,
  );
export default makeSelectApp;
export { selectAppDomain,makeSelectConfig,makeSelectSave,makeSelectImageUpload,makeSelectLogin,makeSelectResetPassword };
