export function createReducer(initialState, fnMap) {
  return (state = initialState, {type, payload}) => {
    const handler = fnMap[type];

    return handler ? handler(state, payload) : state;
  };
}

export function reduceReducers(...reducersArray) {
  return function (previousState, currentAction) {
    const reducerFunction = function (accumulator, currentReducer) {
      return currentReducer(accumulator, currentAction);
    };

    return reducersArray.reduce(reducerFunction, previousState);
  };
}
