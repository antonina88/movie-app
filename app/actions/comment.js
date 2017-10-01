import { createComment, getCommentByMovieId } from '../api';

import {
  ADD_COMMENT_SUCCESS, 
  ADD_COMMENT_FAILURE, 
  GET_COMMENT_BY_MOVIE_ID
} from '../constants';

export const fetchAddComment = (description, movieId) => {
  return (dispatch) => {
    createComment(description, movieId)
    .then(data => {
      dispatch({ type: ADD_COMMENT_SUCCESS, data });
    })
    .catch(e => {
      const error = e.message;
      dispatch({ type: ADD_COMMENT_FAILURE, error })
    });
  };
};
