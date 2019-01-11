import { all } from "redux-saga/effects"
import { moviesSagaWatcher } from "./models/movies"
import { castSagaWatcher } from "./models/cast"
export default function* rootSaga() {
  yield all([...moviesSagaWatcher, ...castSagaWatcher])
}
