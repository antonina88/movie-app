import { ADD_USER, AUTH_SUCCESS, AUTH_FAILURE } from '../constants';

const defaultState = {
  _id: null,
  username: '',
  isLoggedIn: false,
  error: null
}
export const user = (state = defaultState, action) => {
  const { type } = action;

  switch(type) {
    case ADD_USER:
      return authSuccess(state, action);

    case AUTH_SUCCESS:
      return authSuccess(state, action);

    case AUTH_FAILURE:
      return authFailure(state, action);

    default: return state;
    }
};

function authSuccess(state, action) {
  return {
        _id: action.data._id,
        username: action.data.login,
        isLoggedIn: true,
        error: null
      }
}

function authFailure(state, action) {
  return {
        _id: null,
        username: '',
        isLoggedIn: false,
        error: action.message
      }
}