import { ADD_USER, AUTH_SUCCESS, AUTH_FAILURE, SIGNOUT } from '../constants';
import { createUser, authUser, signout } from '../api';

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

export const fetchSignout = (login, password) => {
  return (dispatch) => {
    signout(login, password).then(data => {
      dispatch({ type: SIGNOUT, data });
    });
  };
};
