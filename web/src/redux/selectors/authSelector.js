import { createSelector } from 'reselect';

const auth = (state) => state.auth;
const authCertificate = state => state.auth.certificate;
const authError = (state) => state.auth.error;

export const selectAuth = createSelector(auth, (authSelect) => authSelect);

export const selectAuthCertificate = createSelector(authCertificate, authCertificateSelection => authCertificateSelection  );

export const selectAuthError = createSelector(
    authError,
    (authErrorSelect) => authErrorSelect,
);

