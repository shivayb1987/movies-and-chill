import React from "react"
import PropTypes from "prop-types"

class Pure extends React.Component {
  componentDidMount() {
    const { personId } = this.props.match.params
    this.props.getDetails(personId)
  }

  render() {
    return this.props.children(this.props.details)
  }
}

Pure.propTypes = {
  getDetails: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired
}

export default Pure
