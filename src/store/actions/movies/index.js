import { movieTypes } from "../../types";

const getMoviesData = (moviesData) => {
  return {
    type: movieTypes.GET_MOVIES,
    payload: moviesData,
  };
};

const getCachedMovieData = (cachedMovieData) => {
  return {
    type: movieTypes.GET_CACHED_MOVIES,
    payload: cachedMovieData,
  };
};

export default {
  getMoviesData,
  getCachedMovieData,
};
