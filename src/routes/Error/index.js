import React from "react"
import { history } from "../../store"
import { withStyles } from "@material-ui/core/styles"
const goBack = () => history.go(-1)

const styles = {
  error: {
    color: "red"
  },
  tryAgain: {
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    outline: "none"
  }
}
const Error = ({ classes }) => (
  <div style={{ textAlign: "center" }}>
    <h1>Uh Oh!</h1>
    <p className={classes.error}>
      Some error has occured. Please check again later.
    </p>
    <button className={classes.tryAgain} onClick={goBack}>
      Try again
    </button>
  </div>
)

export default withStyles(styles)(Error)
