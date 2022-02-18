import {createReducer} from './reducerUtils';
import {
  INIT_DASHBOARD_FAIL,
  INIT_DASHBOARD_SUCCESS,
} from '../actions/actionConstants';

const initialState = {
  rcpa: 'multiCompetitor',
  error: {},
};

const initDashboarSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    rcpa: payload.configs.filter(config => config.id === 'RCPA')[0].name,
  };
};
const initDashboardFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};
export default createReducer(initialState, {
  [INIT_DASHBOARD_SUCCESS]: initDashboarSuccessReducer,
  [INIT_DASHBOARD_FAIL]: initDashboardFailReducer,
});
