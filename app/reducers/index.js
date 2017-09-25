import { combineReducers } from 'redux';
import { movies } from './movies';
import { user } from './user';
import { getMovieById } from './getMovieById';
import { movieByTitle } from './movieByTitle';
import { filter } from './filter';
import { failure } from './failure';
import { comment } from './comment';
import { likes } from './likes';

export default combineReducers({
	movies,
	user,
	getMovieById,
	filter,
	movieByTitle,
	failure,
	comment,
	likes
});
