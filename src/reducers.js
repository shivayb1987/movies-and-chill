import { combineReducers } from "redux"
import moviesReducer from "./models/movies"
const appReducers = {
  movies: moviesReducer
}

const appReducer = combineReducers(appReducers)

export default appReducer
