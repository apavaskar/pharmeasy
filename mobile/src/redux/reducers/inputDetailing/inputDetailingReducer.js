import {createReducer} from '../reducerUtils';
import {
  DISTRIBUTE_INPUT_FAIL,
  DISTRIBUTE_INPUT_SUCCESS,
  INIT_INPUT_INVENTORY_FAIL,
  INIT_INPUT_INVENTORY_SUCCESS,
  SAVE_INPUT_TO_STATE_START,
} from '../../actions/inputDetailing/inputDetailingActionConstants';
import {SAVE_VISIT_DATA_SUCCESS} from '../../actions/actionConstants';
const initialState = {
  inputInventories: [],
  inputDistributed: [],
};

const initInputListSuccessReducer = (state = initialState, payload) => {
  let distributedMap = {};
  state.inputDistributed.forEach(item => {
    distributedMap[item.id] = item;
  });
  const inputs = payload.inputs.map(input => {
    if (distributedMap[input.id] !== undefined) {
      return distributedMap[input.id];
    }
    return input;
  });
  return {
    ...state,
    inputInventories: inputs,
  };
};

const initInputListFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const distributeInputSuccessReducer = (state = initialState, payload) => {
  const input = payload.input;
  const inventories = state.inputInventories.map(item => {
    if (item.id === input.id) {
      return input;
    }
    return item;
  });
  return {
    ...state,
    inputInventories: inventories,
    inputDistributed: [
      ...state.inputDistributed.filter(item => item.id !== input.id),
      input,
    ],
  };
};

const distributeInputFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const saveInputsToStateStartReducer = (state = initialState, payload) => {
  return {
    ...state,
    inputDistributed: payload.inputDistributed,
  };
};

const resetInputStateReducer = (state = initialState, payload) => {
  return initialState;
};

export default createReducer(initialState, {
  [INIT_INPUT_INVENTORY_SUCCESS]: initInputListSuccessReducer,
  [INIT_INPUT_INVENTORY_FAIL]: initInputListFailReducer,
  [DISTRIBUTE_INPUT_SUCCESS]: distributeInputSuccessReducer,
  [DISTRIBUTE_INPUT_FAIL]: distributeInputFailReducer,
  [SAVE_INPUT_TO_STATE_START]: saveInputsToStateStartReducer,
  [SAVE_VISIT_DATA_SUCCESS]: resetInputStateReducer,
});
