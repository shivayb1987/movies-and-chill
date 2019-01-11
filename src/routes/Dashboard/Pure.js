import React from "react"
import PropTypes from "prop-types"
import MoviesPage from "../../components/MoviesPage"
import { withStyles } from "@material-ui/core/styles"
import Loader from "../../components/Loader"
import ErrorBoundary from "../../components/ErrorBoundary"

const pointer = {
  cursor: "pointer"
}
const style = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  item: {
    display: "flex",
    flexDirection: "column-reverse",
    flex: 1,
    "list-style-type": "none",
    margin: "1em"
  },
  center: {
    textAlign: "center"
  },
  pointer: {
    ...pointer
  },
  searchBox: {
    background: "#e5e5e5",
    padding: "0.5em"
  },
  searchBorder: {
    display: "flex",
    alignItems: "center",
    height: "40px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #e5e5e5",
    background: "white",
    padding: "0 1em",
    fontSize: "1.2em"
  },
  searchField: {
    border: "none",
    width: "30%",
    height: "90%",
    outline: "none"
  },
  clearSearch: {
    ...pointer,
    "border-radius": "50%",
    background: "lightgray",
    width: "2em",
    height: "2em",
    outline: "none"
  }
}
class Pure extends React.Component {
  state = {
    title: ""
  }
  componentDidMount() {
    const { getMovies } = this.props
    getMovies()
  }

  handleSearch = event => {
    const { onSearch } = this.props
    const title = event.target.value
    this.setState({
      title
    })
    if (this.timerId) {
      clearTimeout(this.timerId)
    }
    this.timerId = setTimeout(() => {
      onSearch(title)
    }, 400)
  }

  clearSearch = () => {
    this.setState({
      title: ""
    })
    this.props.onSearch()
  }

  componentWillUnmount() {
    clearTimeout(this.timerId)
  }

  render() {
    const { moviesData, classes, getMovies } = this.props
    const { results: movies, page, total_pages } = moviesData
    const getPrevPage = () => getMovies(page - 1)
    const getNextPage = () => getMovies(page + 1)
    return (
      <ErrorBoundary>
        <div className={classes.searchBox}>
          <aside className={classes.searchBorder}>
            &#128269;
            <input
              value={this.state.title}
              onChange={this.handleSearch}
              className={classes.searchField}
              type="text"
              id="site-search"
              name="q"
              aria-label="Search through site content"
              placeholder="Find your favorite title!"
            />
            {this.state.title !== "" && (
              <button
                className={classes.clearSearch}
                onClick={this.clearSearch}
              >
                X
              </button>
            )}
          </aside>
        </div>
        {movies && movies.length ? (
          <>
            <MoviesPage movies={movies} />
            <div className={classes.center}>
              <div>
                Page {page} of {total_pages}
              </div>
              <button
                className={classes.pointer}
                disabled={page === 1}
                onClick={getPrevPage}
              >
                &#8592;
              </button>
              <button
                className={classes.pointer}
                disabled={page === total_pages}
                onClick={getNextPage}
              >
                &#8594;
              </button>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </ErrorBoundary>
    )
  }
}

Pure.propTypes = {
  getMovies: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  moviesData: PropTypes.object.isRequired
}

Pure.defaultProps = {
  getMovies: () => {},
  onSearch: () => {},
  moviesData: {}
}

export default withStyles(style)(Pure)
