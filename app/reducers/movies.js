import { ADD_MOVIE, GET_MOVIES_SUCCESS } from '../constants';

export const movies = (state = [], action) => {
  const { type } = action;

  switch(type) {
    case ADD_MOVIE:
      return addMovie(state, action);
    case GET_MOVIES_SUCCESS:
      return getMovies(state, action);

    default:
    	return state;
  }
};

function addMovie(state, {title, description, url}) {
  return [
     ...state.map(movie => Object.assign({}, movie)),
     { title, description, url }
  ];
}

function getMovies(state, action) {
  return [
     ...action.data
  ];
}
