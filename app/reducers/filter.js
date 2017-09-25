import { FIND_MOVIE } from '../constants';

export const filter = (state = {}, action) => {
  const { type } = action;

  if (type === FIND_MOVIE) {
    return findMovie(state, action);
  }
  return state;
};

function findMovie(state, {title, moviesArr}) {
  return [
      ...moviesArr.filter(function(movieItem) {
          return movieItem.title.includes(title);
        })
  ];
}
