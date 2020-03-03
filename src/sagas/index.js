import { all } from 'redux-saga/effects'
import { getAllModuleSagas } from '@src/helpers'

function * rootSaga () {
  yield all(getAllModuleSagas())
}

export default rootSaga
