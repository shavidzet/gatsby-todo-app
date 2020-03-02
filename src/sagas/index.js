import { sagas as todo } from '@src/modules/Todo'

function * rootSaga () {
  yield todo.rootSaga()
}

export default rootSaga
