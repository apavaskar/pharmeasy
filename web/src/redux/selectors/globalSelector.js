import { createSelector } from 'reselect';

const global = (state) => state.global;
const showMessage = (state) => state.global.showMessage;
const showLoader = (state) => state.global.showLoader

export const selectShowMessage = createSelector(
    showMessage,
    (showMessageSelect) => showMessageSelect,
);

export const selectShowLoader = createSelector(
    showLoader,
    (showLoaderSelect) => showLoaderSelect,
);

export const selectGlobal = createSelector(
    global,
    (globalSelect) => globalSelect,
);
