import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

const style = {
  list: {
    "list-style-type": "none"
  },
  item: {
    display: "flex",
    flexDirection: "column-reverse",
    flex: 1,
    margin: "1em",
    "&:hover": {
      transform: "scale(1.1)"
    }
  },
  pointer: {
    cursor: "pointer"
  }
}
class Pure extends React.Component {
  render() {
    const { movie, classes } = this.props
    return (
      <li className={classes.list}>
        <Link to={`/movies/${movie.id}`}>
          <div className={classes.item}>
            <label>{movie.title || movie.name}</label>
            <img
              src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
              alt="movie_poster"
            />
          </div>
        </Link>
      </li>
    )
  }
}

Pure.propTypes = {
  movie: PropTypes.object.isRequired
}

Pure.defaultProps = {}

export default withStyles(style)(Pure)
