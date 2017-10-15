import {
  ADD_MOVIE,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  GET_MOVIE_BY_ID_SUCCESS,
  MOVIE_BY_TITLE_SUCCESS
} from '../constants';

import { listMovies, createMovie, getMovieById, getMovieByTitle } from '../api';


export const fetchAddMovie = (title, description, url) => {
  return (dispatch) => {
    createMovie(title, description, url)
    .then(data => {
      dispatch({ type: ADD_MOVIE, data });
    })
    .catch(e => {
      const error = e.message;
      dispatch({ type: GET_MOVIES_FAILURE, error })
    });
  };
};

export const getMovies = () => dispatch => {
    listMovies()
    .then(data => {
      dispatch({ type: GET_MOVIES_SUCCESS, data })
    })
    .catch(e => {
       const error = e.message;
       dispatch({ type: GET_MOVIES_FAILURE, error })
    });
};

export const fetchMovieById = id => {
  return (dispatch) => {
    getMovieById(id)
      .then(data => {
        console.log('data', data);
        dispatch({ type: GET_MOVIE_BY_ID_SUCCESS, data })
      })
      .catch(e => {
          const error = e.message;
          dispatch({ type: GET_MOVIES_FAILURE, error })
      });
  };
};

export const searchMovieByTitle = title => {
  return (dispatch) => {
    getMovieByTitle(title).then(data => {
      dispatch({ type: MOVIE_BY_TITLE_SUCCESS, data })
    })
    .catch(e => {
      const error = e.message;
      dispatch({ type: GET_MOVIES_FAILURE, error })
    });
  };
};
