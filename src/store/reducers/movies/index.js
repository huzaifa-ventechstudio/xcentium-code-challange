import { movieTypes } from "../../types";

const initialState = {
  moviesData: [],
  cachedMoviesData: [],
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case movieTypes.GET_MOVIES:
      return {
        ...state,
        moviesData: action.payload,
      };
    case movieTypes.GET_CACHED_MOVIES:
      return {
        ...state,
        cachedMoviesData: action.payload,
      };

    default:
      return state;
  }
};

export default moviesReducer;
