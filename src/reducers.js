import { combineReducers } from "redux"
import moviesReducer from "./models/movies"
import castReducer from "./models/cast"
const appReducers = {
  movies: moviesReducer,
  cast: castReducer
}

const appReducer = combineReducers(appReducers)

export default appReducer
