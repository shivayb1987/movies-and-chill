import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { IMAGE_URL } from "../utilities/Config"
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
  },
  caption: {
    wordWrap: "break-word",
    width: "150px"
  }
}

const MovieCard = ({ movie, classes }) => (
  <div className={classes.item}>
    <label className={classes.caption}>{movie.title || movie.name}</label>
    <img
      height={250}
      width={200}
      src={`${IMAGE_URL}/w185/${movie.poster_path}`}
      alt="movie_poster"
    />
  </div>
)
class Pure extends React.Component {
  render() {
    const { movie, classes } = this.props
    return (
      <li className={classes.list}>
        <Link to={`/movies/${movie.id}`}>
          <MovieCard movie={movie} classes={classes} />
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
