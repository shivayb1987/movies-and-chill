import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { IMAGE_URL } from "../utilities/Config"
import ErrorBoundary from "./ErrorBoundary"

const style = {
  clearFloat: {
    clear: "left"
  },
  cast: {
    padding: 0,
    display: "flex",
    listStyleType: "none",
    overflow: "auto",
    width: "100vw",
    border: "1px ridge"
  },
  pointer: {
    cursor: "pointer"
  },
  character: {
    flex: 1,
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "flex-end",
    textAlign: "center",
    alignItems: "center",
    "&:hover": {
      transform: "scale(1.1)"
    }
  },
  profile: {
    overflow: "hidden",
    borderRadius: "50%",
    textAlign: "center"
  }
}
const Character = ({ character }) => (
  <div>
    <label>
      <small>{character.name}</small>
    </label>
    <div>As</div>
    <small>{character.character}</small>
  </div>
)

const ProfilePhoto = ({ character, classes }) => (
  <img
    className={classes.profile}
    width={100}
    height={100}
    src={`${IMAGE_URL}/w185/${character.profile_path}`}
    alt={character.name}
  />
)

const Person = ({ character, classes }) => (
  <div className={classes.character}>
    <Character character={character} />
    <ProfilePhoto character={character} classes={classes} />
  </div>
)

class Pure extends React.Component {
  render() {
    const { cast, classes } = this.props
    return (
      <ErrorBoundary>
        <h2 className={classes.clearFloat}>Cast</h2>
        <ul className={classes.cast}>
          {cast &&
            cast.map(character => (
              <li style={{ margin: "1em" }} key={character.id}>
                <Link to={`/person/${character.id}`}>
                  <Person
                    key={character.id}
                    character={character}
                    classes={classes}
                  />
                </Link>
              </li>
            ))}
        </ul>
      </ErrorBoundary>
    )
  }
}

Pure.propTypes = {
  cast: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

Pure.defaultProps = {
  cast: []
}

export default withStyles(style)(Pure)
