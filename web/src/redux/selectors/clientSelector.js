import { createSelector } from 'reselect';

const menus = state => state.client.menus;

export const selectMenus = createSelector(
    menus,
    (menusSelect) => menusSelect,
);

