import React from "react"
import { ConnectedRouter as Router } from "react-router-redux"
import { Switch, Route } from "react-router-dom"
import { history } from "./store"
import { hot } from "react-hot-loader"
import App from "./routes/Dashboard"
import MovieDetails from "./routes/MovieDetails"
import ErrorPage from "./routes/Error"
import CastPage from "./routes/Cast"
import { TransitionGroup, CSSTransition } from "react-transition-group"

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
)

const Container = ({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} timeout={500} classNames="fade">
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/movies" component={App} />
        <Route path="/movies/:movieId" component={MovieDetails} />
        <Route path="/person/:personId" component={CastPage} />
        <Route path="/error" component={ErrorPage} />
        <Route component={NoMatch} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
)

const router = () => {
  return (
    <Router history={history}>
      <Route component={Container} />
    </Router>
  )
}

export default hot(module)(router)
