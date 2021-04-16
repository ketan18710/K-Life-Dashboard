/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const  makeSelectConfig = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.config,
  );
const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );
const  makeSelectAppState = () =>
  createSelector(
    selectGlobal,
    globalState => globalState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.repositories,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );
  export default makeSelectAppState
export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectConfig
};
