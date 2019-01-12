import { put, call, select } from "redux-saga/effects"
import { saga } from "../movies"
import reducer, {
  getTrendingMovies,
  setTrendingMovies,
  searchMovie,
  setCurrentPage,
  getMovieDetails,
  setMovieDetails,
  getMovieCredits,
  cacheTrendingMovies,
  setCacheDetails,
  selectMovies
} from "../movies"
import { invokeService } from "../../service"

const assertEqual = gen => (testFn, data) => {
  const result = gen.next(data).value
  testFn(result)
}
describe("Testing getTrending Saga", () => {
  test("getTrendingMovies:: calls service", () => {
    const dummyState = {}
    const path = `/trending/movies/day?page=1`
    const payload = 1
    const dummyResponse = {
      status: 200,
      data: {
        page: 1,
        results: [],
        total_pages: 10
      }
    }
    const gen = saga[getTrendingMovies](payload)
    const assert = assertEqual(gen)
    // select current state
    assert(actual => {
      expect(actual).toEqual(select(selectMovies))
    })

    // save the current page
    assert(actual => {
      expect(actual).toEqual(put(setCurrentPage(payload)))
    }, dummyState)

    // call the service
    assert(actual => {
      expect(actual).toEqual(call(invokeService, path))
    })

    // cache the next page
    assert(actual => {
      expect(actual).toEqual(put(cacheTrendingMovies(payload + 1)))
    }, dummyResponse)

    // update the state
    assert(actual => {
      expect(actual).toEqual(
        put(setTrendingMovies({ data: dummyResponse.data, path }))
      )
    }, dummyResponse)

    // it should return
    assert(actual => {
      expect(actual).toEqual(void 0)
    })
  })
  test("getTrendingMovies:: cache hit", () => {
    const path = `/trending/movies/day?page=1`
    const dummyResponse = {
      status: 200,
      data: {
        page: 1,
        results: [],
        total_pages: 10
      }
    }
    const dummyState = {
      [path]: dummyResponse.data
    }
    const payload = 1
    const gen = saga[getTrendingMovies](payload)
    const assert = assertEqual(gen)
    // select current state
    assert(actual => {
      expect(actual).toEqual(select(selectMovies))
    })

    // save the current page
    assert(actual => {
      expect(actual).toEqual(put(setCurrentPage(payload)))
    }, dummyState)

    // call the service
    assert(actual => {
      expect(actual).toEqual(
        put(setTrendingMovies({ data: dummyResponse.data, path }))
      )
    })

    // call the service
    assert(actual => {
      expect(actual).toEqual(put(cacheTrendingMovies(payload + 1)))
    })

    // it should return
    assert(actual => {
      expect(actual).toEqual(void 0)
    }, dummyResponse)
  })
})

describe("Testing searchMovie Saga", () => {
  test("searchMovie:: with search string", () => {
    const dummyState = {}
    const payload = "Jack Reacher"
    const path = `/search/movie?query=Jack+Reacher`
    const dummyResponse = {
      status: 200,
      data: {
        page: 1,
        results: [],
        total_pages: 10
      }
    }
    const gen = saga[searchMovie]({ payload })
    const assert = assertEqual(gen)
    // select current state
    assert(actual => {
      expect(actual).toEqual(select(selectMovies))
    })

    // call the service
    assert(actual => {
      expect(actual).toEqual(call(invokeService, path))
    }, dummyState)

    // update the state
    assert(actual => {
      expect(actual).toEqual(
        put(setTrendingMovies({ data: dummyResponse.data, path }))
      )
    }, dummyResponse)

    // it should return
    assert(actual => {
      expect(actual).toEqual(void 0)
    }, dummyResponse)
  })
  test("searchMovie:: without search string", () => {
    const dummyState = {
      currentPage: 1
    }
    const payload = ""
    const dummyResponse = {
      status: 200,
      data: {
        page: 1,
        results: [],
        total_pages: 10
      }
    }
    const gen = saga[searchMovie]({ payload })
    const assert = assertEqual(gen)
    // select current state
    assert(actual => {
      expect(actual).toEqual(select(selectMovies))
    })

    // fire getTrendingMovies action
    assert(actual => {
      expect(actual).toEqual(put(getTrendingMovies(dummyState.currentPage)))
    }, dummyState)

    // it should return
    assert(actual => {
      expect(actual).toEqual(void 0)
    }, dummyResponse)
  })
  test("searchMovie:: searching with a previous query", () => {
    const dummyResponse = {
      status: 200,
      data: {
        page: 1,
        results: [],
        total_pages: 10
      }
    }
    const path = `/search/movie?query=Jack+Reacher`
    const dummyState = {
      [path]: dummyResponse.data
    }
    const payload = "Jack Reacher"
    const gen = saga[searchMovie]({ payload })
    const assert = assertEqual(gen)
    // select current state
    assert(actual => {
      expect(actual).toEqual(select(selectMovies))
    })

    // fire getTrendingMovies action
    assert(actual => {
      expect(actual).toEqual(
        put(setTrendingMovies({ data: dummyState[path], path }))
      )
    }, dummyState)

    // it should return
    assert(actual => {
      expect(actual).toEqual(void 0)
    })
  })
})
describe("Testing getMovieDetails Saga", () => {
  test("getMovieDetails:: calls service", () => {
    const dummyState = {}
    const payload = "12345"
    const path = `/movie/12345?page=1`
    const dummyResponse = {
      status: 200,
      data: {
        page: 1,
        results: [],
        total_pages: 10
      }
    }
    const gen = saga[getMovieDetails]({ payload })
    const assert = assertEqual(gen)
    // select current state
    assert(actual => {
      expect(actual).toEqual(select(selectMovies))
    })

    // call the service
    assert(actual => {
      expect(actual).toEqual(call(invokeService, path))
    }, dummyState)

    // fire getMovieCredits action
    assert(actual => {
      expect(actual).toEqual(put(getMovieCredits(dummyResponse.data)))
    }, dummyResponse)

    // update the state
    assert(actual => {
      expect(actual).toEqual(
        put(setMovieDetails({ data: dummyResponse.data, path }))
      )
    })

    // it should return
    assert(actual => {
      expect(actual).toEqual(void 0)
    }, dummyResponse)
  })
  test("getMovieDetails:: cache hit", () => {
    const dummyResponse = {
      status: 200,
      data: {
        page: 1,
        results: [],
        total_pages: 10
      }
    }
    const payload = "12345"
    const path = `/movie/${payload}?page=1`
    const dummyState = {
      [path]: dummyResponse.data
    }
    const gen = saga[getMovieDetails]({ payload })
    const assert = assertEqual(gen)

    // select current state
    assert(actual => {
      expect(actual).toEqual(select(selectMovies))
    })

    // update current details
    assert(actual => {
      expect(actual).toEqual(
        put(setMovieDetails({ data: dummyState[path], path }))
      )
    }, dummyState)

    // it should return
    assert(actual => {
      expect(actual).toEqual(void 0)
    }, dummyState)
  })
})
describe("Testing getMovieCredits Saga", () => {
  test("getMovieCredits:: calls service", () => {
    const dummyState = {}
    const dummyResponse = {
      status: 200,
      data: {
        cast: []
      }
    }
    const payload = {
      id: "676768",
      data: {
        page: 1,
        results: [],
        total_pages: 10
      }
    }
    const path = `/movie/${payload.id}/credits?page=1`
    const gen = saga[getMovieCredits]({ payload })
    const assert = assertEqual(gen)
    // select current state
    assert(actual => {
      expect(actual).toEqual(select(selectMovies))
    })

    // call the service
    assert(actual => {
      expect(actual).toEqual(call(invokeService, path))
    }, dummyState)

    // update the state
    assert(actual => {
      expect(actual).toEqual(
        put(
          setMovieDetails({
            data: { ...payload, cast: dummyResponse.data.cast },
            path: `/movie/${payload.id}?page=1`
          })
        )
      )
    }, dummyResponse)

    // it should return
    assert(actual => {
      expect(actual).toEqual(void 0)
    }, dummyResponse)
  })
})
describe("Testing cacheTrendingMovies Saga", () => {
  test("cacheTrendingMovies:: calls service", () => {
    const dummyResponse = {
      status: 200,
      data: {
        page: 2,
        results: [],
        total_pages: 100
      }
    }
    const payload = 2
    const path = `/trending/movies/day?page=2`
    const gen = saga[cacheTrendingMovies]({ payload })
    const assert = assertEqual(gen)

    // call the service
    assert(actual => {
      expect(actual).toEqual(call(invokeService, path))
    })

    // update the state
    assert(actual => {
      expect(actual).toEqual(
        put(setCacheDetails({ data: dummyResponse.data, path }))
      )
    }, dummyResponse)

    // it should return
    assert(actual => {
      expect(actual).toEqual(void 0)
    })
  })
})

/**
 * Test Reducers
 */
describe("Testing Movie Reducers", () => {
  const dummyState = {
    moviesData: {
      results: []
    },
    movieSearched: {}
  }
  const defaultPayload = {
    data: {
      page: 1,
      results: [],
      total_pages: 10
    }
  }
  test("setTrendingMovies", () => {
    const payload = {
      ...defaultPayload,
      path: "/trending/movies/day?page=1"
    }
    expect(reducer(dummyState, setTrendingMovies(payload))).toEqual({
      ...dummyState,
      [payload.path]: payload.data,
      moviesData: payload.data
    })
  })
  test("setCurrentPage", () => {
    const page = 1
    expect(reducer(dummyState, setCurrentPage(page))).toEqual({
      ...dummyState,
      currentPage: page
    })
  })
  test("setMovieDetails", () => {
    const payload = {
      ...defaultPayload,
      path: `/movie/12121?page=1`
    }
    expect(reducer(dummyState, setMovieDetails(payload))).toEqual({
      ...dummyState,
      [payload.path]: payload.data,
      movieDetails: payload.data
    })
  })
})
