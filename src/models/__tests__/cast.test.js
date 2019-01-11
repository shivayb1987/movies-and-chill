import { put, call, select } from "redux-saga/effects"
import { saga } from "../cast"
import reducer, {
  getCareerHistory,
  getPersonDetails,
  setPersonDetails
} from "../cast"
import { invokeService } from "../../service"

const assertEqual = gen => (testFn, data) => {
  const result = gen.next(data).value
  testFn(result)
}

describe("Testing getCareerHistory Saga", () => {
  test("getCareerHistory", () => {
    const dummyState = {}
    const payload = { id: 1212, data: {} }
    const path = `/person/${payload.id}/movie_credits?page=1`
    const dummyResponse = {
      status: 200,
      data: {
        cast: [],
        crew: []
      }
    }
    const gen = saga[getCareerHistory]({ payload })
    const assert = assertEqual(gen)
    // call the service
    assert(actual => {
      expect(actual).toEqual(call(invokeService, path))
    }, dummyState)

    assert(actual => {
      expect(actual).toEqual(
        put(
          setPersonDetails({
            id: payload.id,
            data: { ...payload, ...dummyResponse.data }
          })
        )
      )
    }, dummyResponse)

    // it should return
    assert(actual => {
      expect(actual).toEqual(void 0)
    })
  })
})
describe("Testing getPersonalDetails Saga", () => {
  test("getPersonDetails", () => {
    const dummyState = {}
    const payload = 12121
    const path = `/person/${payload}?page=1`
    const dummyResponse = {
      status: 200,
      data: {
        cast: [],
        crew: []
      }
    }
    const gen = saga[getPersonDetails]({ payload })
    const assert = assertEqual(gen)
    // call the service
    assert(actual => {
      expect(actual).toEqual(call(invokeService, path))
    }, dummyState)

    assert(actual => {
      expect(actual).toEqual(put(getCareerHistory(dummyResponse.data)))
    }, dummyResponse)
    assert(actual => {
      expect(actual).toEqual(
        put(
          setPersonDetails({
            id: payload,
            data: dummyResponse.data
          })
        )
      )
    })

    // it should return
    assert(actual => {
      expect(actual).toEqual(void 0)
    })
  })
})
