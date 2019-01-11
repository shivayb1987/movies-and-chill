import { connect } from "react-redux"
import { compose } from "redux"
import { getPersonDetails } from "../../models/cast"
import Pure from "./Pure"

const s = (state, props) => ({
  details: state.cast[props.match.params.personId] || []
})

const d = dispatch => ({
  getDetails: compose(
    dispatch,
    getPersonDetails
  )
})

export default connect(
  s,
  d
)(Pure)
