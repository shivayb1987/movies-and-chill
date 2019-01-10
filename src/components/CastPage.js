import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import classnames from "classnames"
const style = {
  clearFloat: {
    clear: "left"
  },
  cast: {
    display: "flex",
    flexWrap: "wrap"
  },
  pointer: {
    cursor: "pointer"
  },
  character: {
    flex: 1,
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "flex-end"
  },
  profile: {
    overflow: "hidden",
    borderRadius: "50%",
    textAlign: "center"
  }
}
class Pure extends React.Component {
  render() {
    const { cast, classes } = this.props
    return (
      <>
        <h2 className={classes.clearFloat}>Cast</h2>
        <ul className={classes.cast}>
          {cast &&
            cast.map(character => (
              <li
                className={classnames(classes.character, classes.pointer)}
                key={character.id}
              >
                <div>
                  <label>
                    <small>{character.name}</small>
                  </label>
                  <div>As</div>
                  <small>{character.character}</small>
                </div>

                <img
                  className={classes.profile}
                  width={100}
                  height={100}
                  src={`http://image.tmdb.org/t/p/w185/${
                    character.profile_path
                  }`}
                  alt={character.name}
                />
              </li>
            ))}
        </ul>
      </>
    )
  }
}

Pure.propTypes = {
  cast: PropTypes.array.isRequired
}

Pure.defaultProps = {}

export default withStyles(style)(Pure)
