import { takeEvery } from "redux-saga/effects"

export default function createSagaWatcher(sagas) {
  return Object.keys(sagas).map(saga =>
    (function*() {
      yield takeEvery(saga, sagas[saga])
    })()
  )
}
