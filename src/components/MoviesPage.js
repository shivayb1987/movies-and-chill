import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import MoviePage from "./MoviePage"

const style = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
}
class Pure extends React.Component {
  render() {
    const { movies, classes } = this.props
    return (
      <ul className={classes.container}>
        {movies.map(movie => (
          <MoviePage key={movie.id} movie={movie} />
        ))}
      </ul>
    )
  }
}

Pure.propTypes = {
  movies: PropTypes.array.isRequired
}

Pure.defaultProps = {
  movies: []
}

export default withStyles(style)(Pure)
