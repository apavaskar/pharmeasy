import {createReducer} from './reducerUtils';
import {
  INIT_SETTINGS_VIEW_FAIL,
  INIT_SETTINGS_VIEW_SUCCESS,
  SYNC_NOW_FAIL,
  SYNC_NOW_SUCCESS,
} from '../actions/actionConstants';
import {
  TROUBLESHOOT_INIT_FAIL,
  TROUBLESHOOT_INIT_START,
  TROUBLESHOOT_INIT_SUCCESS
} from "../actions/troubleshoot/troubleShootActionConstants";

const initialState = {
  lastSyncLog: {},
  troubleshootDone: false,
  error: {},
};

const initSettingsSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    lastSyncLog: payload.lastSyncLog,
  };
};

const initSettingsFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const syncNowSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
  };
};

const syncNowFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const troubleShootSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
  };
};

const troubleShootFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};


export default createReducer(initialState, {
  [INIT_SETTINGS_VIEW_SUCCESS]: initSettingsSuccessReducer,
  [INIT_SETTINGS_VIEW_FAIL]: initSettingsFailReducer,
  [SYNC_NOW_SUCCESS]: syncNowSuccessReducer,
  [SYNC_NOW_FAIL]: syncNowFailReducer,
  [TROUBLESHOOT_INIT_SUCCESS]: troubleShootSuccessReducer,
  [TROUBLESHOOT_INIT_FAIL]: troubleShootFailReducer,
});
