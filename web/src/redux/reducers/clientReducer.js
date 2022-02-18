import { createReducer } from './reducerUtils';
import {INIT_MENU_LOAD_FAIL, INIT_MENU_LOAD_SUCCESS} from "../actions/client/clientActionConstant";
const initialState = {
  menus: [],
  error: {}
};

const initMenuSuccessReducer = (state = initialState, payload) => {
    console.log("TEST", payload)
  return {
    ...state,
      menus: payload.menus
  };
};

const initMenuFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};


export default createReducer(initialState, {
  [INIT_MENU_LOAD_SUCCESS]: initMenuSuccessReducer,
  [INIT_MENU_LOAD_FAIL]: initMenuFailReducer
});
