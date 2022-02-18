import {selectAdhocQuery, selectQuery} from './genericDao';
import {INPUT_INVENTORY} from './constants';

export const loadAllInputs = async () => {
  return await selectQuery(INPUT_INVENTORY, [0], 'where balance > ?');
};

export const loadAllDistributedInputs = async visitId => {
  return await selectAdhocQuery(
    'SELECT d.id id, d.visitId visitId, inputId, serverId, action, quantity, ' +
      ' code, name, type, batchNumber, inventoryDate, expiryDate, quantityAdded, distributed, balance from InputDistribution d' +
      ' inner join InputInventory i on i.stockId = d.inputId where visitId = ?',
    [visitId],
  );
};
