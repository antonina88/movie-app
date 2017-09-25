import { ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, GET_COMMENT_BY_MOVIE_ID } from '../constants';

export const comment = (state = [], action) => {
  const { type } = action;

  switch(type) {
    case ADD_COMMENT_SUCCESS:
      return addComment(state, action);
    case ADD_COMMENT_FAILURE:
      return addCommentFailure(state, action);
    case GET_COMMENT_BY_MOVIE_ID:
      return getCommentForMovie(state, action);
    default:
    	return state;
  }
};

function addComment(state, {description, movieId}) {
  return [
     ...state.map(movie => Object.assign({}, movie)),
     { description, movieId }
  ];
}

function addCommentFailure(state, action) {
  return [
     ...action.data
  ];
}

function getCommentForMovie(state, action) {
  return action.data;
}