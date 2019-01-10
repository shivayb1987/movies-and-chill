import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import createHistory from "history/createBrowserHistory"
import { routerMiddleware } from "react-router-redux"
import compose from "lodash/flowRight"
import rootReducer from "./reducers"
import sagas from "./sagas"

export const history = createHistory({ "basename:": process.env.BASE_PATH })

const reduxRouterMiddleware = routerMiddleware(history)

const sagaMiddleware = createSagaMiddleware()
const defaultState = {}
const middlewares = [sagaMiddleware, reduxRouterMiddleware]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(...middlewares))
)
sagaMiddleware.run(sagas)

export default store
