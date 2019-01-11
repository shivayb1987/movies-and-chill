import React from "react"
import PropTypes from "prop-types"
import Data from "./Data"
import ProfilePicture from "../../components/ProfilePicture"
import { withStyles } from "@material-ui/core/styles"

const styles = {
  floatLeft: {
    float: "right"
  },
  title: {
    borderBottom: "1px solid"
  },
  noListType: {
    listStyleType: "none"
  }
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

const formatDate = dateStr => {
  const date = new Date(dateStr)
  const day = date.getDate()
  const year = date.getFullYear()
  const month = date.getMonth()
  const fullMonth = MONTHS[month]
  return `${fullMonth} ${day}, ${year}`
}

const getAge = dateStr => {
  const one_day = 1000 * 60 * 60 * 24
  const one_year = one_day * 365
  const now = new Date()
  const past = new Date(dateStr)

  const difference = now - past
  const inYears = difference / one_year
  return Math.floor(inYears)
}
class Pure extends React.Component {
  render() {
    const { classes, ...props } = this.props
    return (
      <Data {...props}>
        {details => (
          <>
            <h1 className={classes.title}>{details.name}</h1>
            <div className={classes.floatLeft}>
              <ProfilePicture
                profilePath={details.profile_path}
                title={details.name}
                width={400}
              />
              <ul className={classes.noListType}>
                <li>
                  <b>Born</b> {formatDate(details.birthday)}{" "}
                  <span>(age {getAge(details.birthday)})</span>
                  <p>
                    <span>{details.place_of_birth}</span>
                  </p>
                </li>
                <li>
                  <b>Occupation</b> {details.known_for_department}
                </li>
              </ul>
            </div>
            <p>{details.biography}</p>
            <h3>Filmography</h3>
            {details.cast && (
              <ol start={1}>
                {details.cast.map(character => (
                  <li key={character.id}>{character.title}</li>
                ))}
              </ol>
            )}
          </>
        )}
      </Data>
    )
  }
}

Pure.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Pure)
