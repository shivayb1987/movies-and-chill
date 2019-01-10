import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import CastPage from "../../components/CastPage"

const style = {
  item: {
    display: "flex",
    flexDirection: "column-reverse",
    flex: 1,
    "list-style-type": "none",
    margin: "1em",
    "&:hover": {
      transform: "scale(1.1)"
    }
  },
  pointer: {
    cursor: "pointer"
  },
  center: {
    // textAlign: "center"
  },
  floatLeft: {
    float: "left"
  }
}

const getLanguage = (languages, key) =>
  languages.some(language => language.iso_639_1 === key)
class Pure extends React.Component {
  componentDidMount() {
    const { movieId } = this.props.match.params
    this.props.getDetails(movieId)
  }

  render() {
    const { movieDetails, classes } = this.props
    return (
      <div className={classes.center}>
        <div>
          <h1>{movieDetails.title || movieDetails.name}</h1>
          <em>{movieDetails.tagline}</em>
        </div>
        <img
          className={classes.floatLeft}
          height={400}
          width={500}
          src={`http://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt="movie_poster"
        />
        <h3>Plot</h3>
        <p>
          <i>{movieDetails.overview}</i>
        </p>
        <ul>
          <li>
            <b>Original Language:</b>{" "}
            {getLanguage(
              (movieDetails.spoken_languages = []),
              movieDetails.original_language
            ).name || movieDetails.original_language}
          </li>
          <li>
            <b>Release Date:</b> {movieDetails.release_date}
          </li>
          <li>
            <b>Length:</b> {movieDetails.runtime} minutes
          </li>
          <li>
            <b>Rating:</b> {movieDetails.vote_average}
          </li>
          <li />
        </ul>
        {movieDetails.cast && <CastPage cast={movieDetails.cast} />}
      </div>
    )
  }
}

Pure.propTypes = {
  movieDetails: PropTypes.object.isRequired,
  getDetails: PropTypes.func.isRequired
}

Pure.defaultProps = {
  movieDetails: {},
  getDetails: () => {}
}

export default withStyles(style)(Pure)
