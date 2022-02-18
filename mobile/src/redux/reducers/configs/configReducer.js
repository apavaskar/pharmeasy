import {createReducer} from '../reducerUtils';
import {
  LOAD_CONFIGS_FAIL,
  LOAD_CONFIGS_SUCCESS,
} from '../../actions/configs/ConfigActionConstants';

const initialState = {
  rcpa: 'multiCompetitor',
  drawers: {},
  cardList: [
    'notifications',
    'effortCoverage',
    'effortCallAverage',
    'missedCallReport',
    'wrfApprovals',
  ],
  error: {},
};

const loadConfigsSuccessReducer = (state = initialState, payload) => {
  let drawerMap = {};
  payload.configs
    .filter(config => config.configName === 'DRAWER_MENU')
    .forEach(drawer => (drawerMap[drawer.configValue] = drawer));
  const systemConfigs = payload.systemConfigs.filter(
    config => config.id === 'RCPA',
  )[0].name;
  let cardList = state.cardList;
  if (
    payload.configs.filter(config => config.configName === 'emrok_dashboard')
      .length > 0
  ) {
    if (!cardList.includes('monthlyPatient')) {
      cardList.push('monthlyPatient');
      cardList.push('dailyPatient');
    }
  }
  return {
    ...state,
    rcpa: systemConfigs,
    cardList: cardList,
    drawers: drawerMap,
  };
};
const loadConfigFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

export default createReducer(initialState, {
  [LOAD_CONFIGS_SUCCESS]: loadConfigsSuccessReducer,
  [LOAD_CONFIGS_FAIL]: loadConfigFailReducer,
});
