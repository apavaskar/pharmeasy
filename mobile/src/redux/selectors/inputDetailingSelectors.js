import {createSelector} from 'reselect';
const inputDetailing = state => state.inputDetailing;
const inputInventory = state => state.inputDetailing.inputInventories;
const inputDistributed = state => state.inputDetailing.inputDistributed;

export const inputInventorySelector = createSelector(
  inputInventory,
  inputInventorySelection => inputInventorySelection,
);

export const inputDistributedSelector = createSelector(
  inputDistributed,
  inputDistributedSelection => inputDistributedSelection,
);
