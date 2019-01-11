import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import CastPage from "../../components/CastPage"
import Details from "./Details"
import ProfilePicture from "../../components/ProfilePicture"
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

const MoviePoster = ({ movieDetails, classes }) => (
  <ProfilePicture
    title={movieDetails.title || movieDetails.name}
    height={400}
    width={400}
    profilePath={movieDetails.poster_path}
    tagline={movieDetails.tagline}
    className={classes.floatLeft}
  />
)
const Plot = ({ text }) => (
  <>
    <h3>Plot</h3>
    <p>
      <i>{text}</i>
    </p>
  </>
)

const MovieInfo = ({ movieDetails }) => (
  <ul style={{ listStyleType: "none" }}>
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
)
class Pure extends React.Component {
  render() {
    const { classes, ...restProps } = this.props
    return (
      <Details {...restProps}>
        {movieDetails => (
          <div className={classes.center}>
            <MoviePoster movieDetails={movieDetails} classes={classes} />
            <Plot text={movieDetails.overview} />
            <MovieInfo movieDetails={movieDetails} />
            {movieDetails.cast && <CastPage cast={movieDetails.cast} />}
          </div>
        )}
      </Details>
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
