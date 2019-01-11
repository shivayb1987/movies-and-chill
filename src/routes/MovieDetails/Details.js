import React from "react"
import Loader from "../../components/Loader"
class Details extends React.Component {
  componentDidMount() {
    const { movieId } = this.props.match.params
    this.props.getDetails(movieId)
  }

  render() {
    const { movieDetails } = this.props
    if (!movieDetails || !movieDetails.overview) {
      return <Loader />
    }
    return this.props.children(movieDetails)
  }
}

export default Details
