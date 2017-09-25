import { ADD_USER, AUTH_SUCCESS, AUTH_FAILURE } from '../constants';
import { createUser, authUser } from '../api';

export const fetchNewUser = (login, password) => {
  return (dispatch) => {
    createUser(login, password).then(data => {
      dispatch({ type: ADD_USER, data });
    });
  };
};

export const fetchAuth = (login, password) => {
  return (dispatch) => {
    authUser(login, password)
    .then(data => {
      dispatch({ type: AUTH_SUCCESS, data });
    })
    .catch(error => {
      const message = error.message;
      dispatch({ type: AUTH_FAILURE, message });
    });
  };
};

