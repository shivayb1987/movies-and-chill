import React from "react"
import PropTypes from "prop-types"
import Credits from "./Data"

class Pure extends React.Component {
  componentDidMount() {
    const { personId } = this.props.match.params
    this.props.getDetails(personId)
  }

  render() {
    return this.props.children(this.props.details)
  }
}

export default Pure
