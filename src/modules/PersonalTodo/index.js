import React from 'react'

import Todo, {
  reducers,
  sagas
} from '@src/HOC-modules/Todo'

export const moduleName = 'PERSONAL'

export const reducer = reducers.rootReducerWithName(moduleName)
export const saga = sagas.rootSagaWithName(moduleName)

export default () =>
  <Todo moduleName={moduleName} />
