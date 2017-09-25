import { ADD_LIKE } from '../constants';
import { addLike } from '../api';

export const fetchLike = (id) => {
  return (dispatch) => {
    addLike(id).then(data => {
    	console.log('ADD_LIKE', data);
      dispatch({ type: ADD_LIKE, data });
    });
  };
};
