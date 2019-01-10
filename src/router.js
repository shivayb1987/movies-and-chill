import React from "react"
import { ConnectedRouter as Router } from "react-router-redux"
import { Switch, Route } from "react-router-dom"
import { history } from "./store"
import { hot } from "react-hot-loader"
import App from "./routes/Dashboard"
import MovieDetails from "./routes/MovieDetails"

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
)

const router = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/movies" component={App} />
        <Route path="/movies/:movieId" component={MovieDetails} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default hot(module)(router)
