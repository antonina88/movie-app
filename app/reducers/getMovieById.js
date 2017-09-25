import { GET_MOVIE_BY_ID_SUCCESS } from '../constants';


export const getMovieById = (state = [], action) => {
	switch(action.type) {
		case GET_MOVIE_BY_ID_SUCCESS:
			return getMovie(state, action);
		default:
			return state;
	}
};

function getMovie(state, action) {
  return action.data;
}
