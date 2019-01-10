import { connect } from "react-redux"
import { compose } from "redux"
import { getTrendingMovies, searchMovie } from "../../models/movies"
import Pure from "./Pure"

const s = state => ({
  moviesData: state.movies.moviesData
})

const d = dispatch => ({
  getMovies: compose(
    dispatch,
    getTrendingMovies
  ),
  onSearch: compose(
    dispatch,
    searchMovie
  )
})

export default connect(
  s,
  d
)(Pure)
