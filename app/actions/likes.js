import { ADD_LIKE, REMOVE_LIKE } from '../constants';
import { addLike, removeLike } from '../api';

export const fetchLike = (id) => {
  return (dispatch) => {
    addLike(id).then(data => {
      dispatch({ type: ADD_LIKE, data });
    });
  };
};

export const fetchRemoveLike = (id) => {
  return (dispatch) => {
    removeLike(id).then(data => {
      dispatch({ type: REMOVE_LIKE, data });
    });
  };
};
