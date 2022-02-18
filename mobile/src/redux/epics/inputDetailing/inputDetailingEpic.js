import {ofType} from 'redux-observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {
  loadAllDistributedInputs,
  loadAllInputs,
} from '../../../db/InputDbService';
import {
  DISTRIBUTE_INPUT_START,
  INIT_INPUT_DISTRIBUTION_START,
  INIT_INPUT_INVENTORY_START,
} from '../../actions/inputDetailing/inputDetailingActionConstants';
import {
  distributeInputFailAction,
  distributeInputSuccessAction,
  initInputDistributionFailAction,
  initInputDistributionSuccessAction,
  inputInventoryFailAction,
  inputInventorySuccessAction,
} from '../../actions/inputDetailing/inputDetailingAction';

export const initInputInventoryListEpic = action$ => {
  return action$.pipe(
    ofType(INIT_INPUT_INVENTORY_START),
    switchMap(action =>
      from(loadAllInputs()).pipe(
        map(inputs => {
          const inputDistributed = action.payload.inputDistributed;
          let distributionMap = {};
          inputDistributed.forEach(d => {
            distributionMap[d.stockId] = d;
          });
          console.log(distributionMap);
          return inputInventorySuccessAction({
            inputs: inputs.map(input => {
              return {
                ...input,
                currentDistribution: distributionMap[input.stockId]
                  ? distributionMap[input.stockId].distributed
                  : 0,
              };
            }),
          });
        }),
        catchError(error => of(inputInventoryFailAction({error: error}))),
      ),
    ),
  );
};

export const distributeInputEpic = action$ => {
  return action$.pipe(
    ofType(DISTRIBUTE_INPUT_START),
    map(action => {
      let input = {
        ...action.payload.input,
        balance:
          action.payload.input.quantityAdded -
          action.payload.input.distributed -
          action.payload.qty,
        distributed: parseInt(action.payload.qty),
      };
      return distributeInputSuccessAction({input: input});
    }),
    catchError(error => of(distributeInputFailAction({error: error}))),
  );
};

export const initDistributedInputsEpic = action$ => {
  return action$.pipe(
    ofType(INIT_INPUT_DISTRIBUTION_START),
    switchMap(action =>
      from(loadAllDistributedInputs(action.payload.visitId)).pipe(
        map(inputs =>
          initInputDistributionSuccessAction({
            inputs: inputs.map(input => {
              return {...input, originalDistributed: input.distributed};
            }),
          }),
        ),
        catchError(error =>
          of(initInputDistributionFailAction({error: error})),
        ),
      ),
    ),
  );
};
