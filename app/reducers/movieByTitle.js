import { MOVIE_BY_TITLE_SUCCESS } from '../constants';


export const movieByTitle = (state = [], action) => {
	switch(action.type) {
		case MOVIE_BY_TITLE_SUCCESS:
			return getMovieByTitle(state, action);
		default:
			return state;
	}
};

function getMovieByTitle(state, action) {
  return action.data;
}
