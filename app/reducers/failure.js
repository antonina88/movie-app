import { GET_MOVIES_FAILURE } from '../constants';

export const failure = (state = { error: null }, action) => {
  const { type } = action;

  switch(type) {
    case GET_MOVIES_FAILURE:
      return failureData(state, action);
    default: return state;
    }
};

function failureData(state, action) {
  return Object.assign({}, state, {
        error: action.error
    })
}