import {createSelector} from 'reselect';

const auth = state => state.auth;
const loggedIn = state => state.auth.loggedIn;
const authDone = state => state.auth.authDone;
const certificate = state => state.auth.certificate;

export const loggedInSelector = createSelector(
  loggedIn,
  loggedInSelection => loggedInSelection,
);

export const authDoneSelector = createSelector(
  authDone,
  authDoneSelection => authDoneSelection,
);

export const certificateSelector = createSelector(
  certificate,
  certificateSelection => certificateSelection,
);
