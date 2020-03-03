import { all } from 'redux-saga/effects'

function allModules (r) {
  return r
    .keys()
    .map(key => r(key))
    .map((item) => {
      return item.saga()
    })
}

const modules = allModules(require.context('@src/modules/', true, /index.js$/))

function * rootSaga () {
  yield all(modules)
}

export default rootSaga
