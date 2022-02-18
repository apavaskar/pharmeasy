import { createSelector } from 'reselect';

const structure = state => state.fieldStructure.structure;

export const selectFieldStructure = createSelector(
    structure,
        fieldStructureSelection => fieldStructureSelection  );


