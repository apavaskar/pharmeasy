import {createSelector} from 'reselect';

const config = state => state.config;
const rcpa = state => state.config.rcpa;
const drawers = state => state.config.drawers;
const cardList = state => state.config.cardList;

export const rcpaConfigSelector = createSelector(
  rcpa,
  rcpaSelection => rcpaSelection,
);

export const drawerSelector = createSelector(
  drawers,
  drawerSelection => drawerSelection,
);

export const cardListSelector = createSelector(
  cardList,
  cardListSelection => cardListSelection,
);
