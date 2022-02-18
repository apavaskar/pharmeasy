import {ofType} from 'redux-observable';
import {TRANSACTION_SYNC_START} from '../actions/actionConstants';
import {catchError, map, switchMap} from 'rxjs/operators';
import {forkJoin, from, of} from 'rxjs';
import {
  transactionDataSyncFailAction,
  transactionDataSyncSuccessAction,
} from '../actions/transactionSyncAction';
import {
  pickTransactionsToSync,
  updateSyncedData,
} from '../../db/sync/TransactionDbService';
import {syncCRMData, syncVisits} from '../../api/transactionSyncAPI';

export const transactionSyncEpic = action$ => {
  return action$.pipe(
    ofType(TRANSACTION_SYNC_START),
    switchMap(action => syncTransactions(action)),
    catchError(error => of(transactionDataSyncFailAction({error: error}))),
  );
};

export const syncTransactions = action =>
  from(pickTransactionsToSync()).pipe(
    switchMap(result =>
      forkJoin(
        syncVisits(result, action.payload.certificate),
        syncCRMData(
          {
            rawData: result.crmDoctorStages,
            doctorStatus: result.crmDoctorStatus,
          },
          action.payload.certificate,
        ),
      ).pipe(
        switchMap(response =>
          from(updateSyncedData(response[0].response)).pipe(
            map(data => {
              return transactionDataSyncSuccessAction({
                data: data,
              });
            }),
            catchError(error =>
              of(transactionDataSyncFailAction({error: error})),
            ),
          ),
        ),
      ),
    ),
  );
