import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"

const styles = {
  root: {
    margin: "5em",
    zIndex: 10,
    display: "flex",
    justifyContent: "center"
  },
  header: {
    display: "block",
    textAlign: "center"
  },
  dots: {
    width: "1em"
  }
}
class Loader extends Component {
  state = {
    // eslint-disable-line
    text: this.props.text
  }

  componentDidMount() {
    const stopper = this.props.text + "..."
    this._interval = setInterval(() => {
      if (this.state.text !== stopper) {
        this.setState(prevState => ({
          text: prevState.text + "."
        }))
      } else {
        this.setState(() => ({
          text: this.props.text
        }))
      }
    }, 200)
  }

  componentWillUnmount() {
    clearInterval(this._interval)
  }

  render() {
    const { classes, children } = this.props
    if (children) {
      return children(this.state.text)
    }
    return (
      <div className={classes.root}>
        <InputLabel className={classes.header}>Loading</InputLabel>
        <InputLabel className={classes.dots}>{this.state.text}</InputLabel>
      </div>
    )
  }
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
}

Loader.defaultProps = {
  text: ""
}

export default withStyles(styles)(Loader)
