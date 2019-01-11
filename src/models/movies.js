import { put, call, select } from "redux-saga/effects"
import { createAction, createReducer } from "redux-act"
import createSagaWatcher from "../utilities/createSagaWatcher"
import { isSuccess } from "../utilities/Utils"
import { invokeService } from "../service"
export const getTrendingMovies = createAction("RETRIEVE_TRENDING_MOVIES")
export const setTrendingMovies = createAction("UPDATE_TRENDING_MOVIES")
export const searchMovie = createAction("SEARCH_MOVIE")
export const setCurrentPage = createAction("UPDATE_CURRENT_PATH")
export const getMovieDetails = createAction("GET_MOVIE_DETAILS")
export const setMovieDetails = createAction("UPDATE_MOVIE_DETAILS")
export const getMovieCredits = createAction("GET_MOVIE_CREDITS")

export const selectMovies = state => state.movies
export const saga = {
  [getTrendingMovies]: function*({ payload = 1 }) {
    const path = `/trending/movies/day?page=${payload}`
    const state = yield select(selectMovies)
    // retrieve from cache if exists
    yield put(setCurrentPage(payload))
    if (state[path]) {
      yield put(setTrendingMovies({ data: state[path], path }))
      return
    }
    const response = yield call(invokeService, path)
    if (isSuccess(response.status)) {
      const { data } = response
      yield put(setTrendingMovies({ data, path }))
    }
  },
  [searchMovie]: function*({ payload = "" }) {
    const query = payload.replace(/ /g, "+")
    const path = `/search/movie?query=${query}`
    const state = yield select(selectMovies)
    if (payload === "") {
      const { currentPage } = state
      yield put(getTrendingMovies(currentPage))
      return
    }
    // retrieve from cache if exists
    if (state[path]) {
      // console.log("Cache hit!")
      yield put(setTrendingMovies({ data: state[path], path }))
      return
    }
    const response = yield call(invokeService, path)
    if (isSuccess(response.status)) {
      const { data } = response
      yield put(setTrendingMovies({ data, path }))
    }
  },
  [getMovieDetails]: function*({ payload }) {
    const path = `/movie/${payload}?page=1`
    const state = yield select(selectMovies)
    // retrieve from cache if exists
    if (state[path]) {
      // console.log("Cache hit!")
      yield put(setMovieDetails({ data: state[path], path }))
      return
    }
    const response = yield call(invokeService, path)
    if (isSuccess(response.status)) {
      const { data } = response
      yield put(getMovieCredits(data))
      yield put(setMovieDetails({ data, path }))
    }
  },
  [getMovieCredits]: function*({ payload }) {
    const { id } = payload
    const path = `/movie/${id}/credits?page=1`
    const state = yield select(selectMovies)
    // retrieve from cache if exists
    if (state[path]) {
      console.log("Cache hit!")
      // yield put(setMovieCredits({ data: state[path], path }))
      return
    }
    const response = yield call(invokeService, path)
    if (isSuccess(response.status)) {
      const { data } = response
      const { cast } = data

      yield put(setMovieDetails({ data: { ...payload, cast }, path }))
    }
  }
}

export const moviesSagaWatcher = createSagaWatcher(saga)

export const reducer = {
  [setTrendingMovies]: (state, { data, path }) => ({
    ...state,
    [path]: data,
    moviesData: data
  }),
  [setCurrentPage]: (state, payload) => ({
    ...state,
    currentPage: payload
  }),
  [setMovieDetails]: (state, { data, path }) => ({
    ...state,
    [path]: data,
    movieDetails: data
  })
}

const initialState = {
  moviesData: {
    results: []
  },
  movieSearched: {}
}

export default createReducer(reducer, initialState)
