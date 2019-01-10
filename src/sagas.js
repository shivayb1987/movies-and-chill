import { all } from "redux-saga/effects"
import { moviesSagaWatcher } from "./models/movies"
export default function* rootSaga() {
  yield all([...moviesSagaWatcher])
}
