import { FIND_MOVIE } from '../constants';

export const findMovie = (title, moviesArr) => ({
  	type: FIND_MOVIE,
  	title,
  	moviesArr
});
