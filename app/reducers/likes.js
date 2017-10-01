import { ADD_LIKE, REMOVE_LIKE } from '../constants';

const defaultState = '';

export const likes = (state = defaultState, action) => {
  const { type } = action;

  switch(type) {
    case ADD_LIKE:
      return action.data;
   	case REMOVE_LIKE:
      return action.data;
    default:
    	return state;
  }
};
