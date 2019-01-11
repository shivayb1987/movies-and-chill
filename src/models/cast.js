import { put, call, select } from "redux-saga/effects"
import { createAction, createReducer } from "redux-act"
import createSagaWatcher from "../utilities/createSagaWatcher"
import { isSuccess } from "../utilities/Utils"
import { invokeService } from "../service"

export const getCareerHistory = createAction("GET_PERSON_HISTORY")
export const setMovieCredits = createAction("UPDATE_MOVIE_CREDITS")
export const getPersonDetails = createAction("GET_PERSON_DETAILS")
export const setPersonDetails = createAction("UPDATE_PERSON_DETAILS")

export const saga = {
  [getCareerHistory]: function*({ payload }) {
    const { id } = payload
    const path = `/person/${id}/movie_credits?page=1`
    const response = yield call(invokeService, path)
    const { status, data = {} } = response
    if (isSuccess(status)) {
      yield put(setPersonDetails({ id, data: { ...payload, ...data } }))
    }
  },
  [getPersonDetails]: function*({ payload }) {
    const path = `/person/${payload}?page=1`
    const response = yield call(invokeService, path)
    const { status, data = {} } = response
    if (isSuccess(status)) {
      yield put(getCareerHistory(data))
      yield put(setPersonDetails({ id: payload.id, data: data }))
    }
  }
}

export const castSagaWatcher = createSagaWatcher(saga)

const reducer = {
  [setPersonDetails]: (state, { id, data }) => ({
    ...state,
    [id]: data
  })
}

const initialState = {
  cast: {}
}
export default createReducer(reducer, initialState)
