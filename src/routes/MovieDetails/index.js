import { connect } from "react-redux"
import { compose } from "redux"
import { getMovieDetails } from "../../models/movies"
import Pure from "./Pure"

const s = state => ({
  movieDetails: state.movies.movieDetails
})

const d = dispatch => ({
  getDetails: compose(
    dispatch,
    getMovieDetails
  )
})

export default connect(
  s,
  d
)(Pure)
