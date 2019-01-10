import { combineReducers } from "redux"
import moviesReducer from "./models/movies"
const appReducers = {
  movies: moviesReducer
}

const appReducer = combineReducers(appReducers)

// const reset = Object.keys(appReducers).reduce((acc, key) => ({[key]: {}}), {})

// const rootReducer = (state, action) => {
//   if (action.type === logout.getType()) {
//     return {
//       ...reset
//     }
//   }
//   return appReducer(state, action)
// }

export default appReducer
