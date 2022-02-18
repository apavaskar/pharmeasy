import {LOAD_MY_TEAM_PLAN_START} from '../actions/actionConstants';
import {ofType} from 'redux-observable';
import {from, of} from 'rxjs';
import {getBeatsPlanned} from '../../db/ManagerDbService';
import {
  loadMyTeamPlanFailAction,
  loadMyTeamPlanSuccessAction,
} from '../actions/managerPlanAction';
import {catchError, map, switchMap} from 'rxjs/operators';

export const loadMyTeamPlanEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_MY_TEAM_PLAN_START),
    switchMap(action =>
      from(getBeatsPlanned(action.payload.date)).pipe(
        map(data => loadMyTeamPlanSuccessAction({data: data})),
        catchError(error => of(loadMyTeamPlanFailAction({error: error}))),
      ),
    ),
  );
};
