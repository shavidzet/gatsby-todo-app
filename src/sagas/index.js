import { sagas as todo } from '@src/modules/Todo'

function * rootSaga () {
  yield todo()
}

export default rootSaga
