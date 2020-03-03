import { call, put, takeLatest, all } from 'redux-saga/effects'
import { actions, constants } from '@src/HOC-modules/Todo'
import { api } from '@src/services'

export const createTodoWithName = (moduleName) => {
  function * createTodo (action) {
    try {
      const response = yield call(api.addTodo, action.name)
      yield all([
        put(actions.create(moduleName).success(response)),
        put(actions.read(moduleName).request())
      ])
    } catch (e) {
      const { response, message } = e
      yield put(actions.create(moduleName).failure(response, message))
    }
  }

  return createTodo
}

export const readTodosWithName = (moduleName) => {
  function * readTodos () {
    try {
      const response = yield call(api.fetchTodos)
      yield put(actions.read(moduleName).success(response))
    } catch (e) {
      const { response, message } = e
      yield put(actions.read(moduleName).failure(response, message))
    }
  }

  return readTodos
}

export const updateTodoWithName = (moduleName) => {
  function * updateTodo (action) {
    try {
      const response = yield call(api.updateTodo, action.id, action.name)
      yield all([
        put(actions.update(moduleName).success(response)),
        put(actions.read(moduleName).request())
      ])
    } catch (e) {
      const { response, message } = e
      yield put(actions.update(moduleName).failure(response, message))
    }
  }

  return updateTodo
}

export const deleteTodoWithName = (moduleName) => {
  function * deleteTodo (action) {
    try {
      const response = yield call(api.deleteTodo, action.id, action.name)
      yield all([
        put(actions.deleteIt(moduleName).success(response)),
        put(actions.read(moduleName).request())
      ])
    } catch (e) {
      const { response, message } = e
      yield put(actions.deleteIt(moduleName).failure(response, message))
    }
  }

  return deleteTodo
}

export const rootSagaWithName = (moduleName) => {
  function * rootSaga () {
    yield takeLatest(constants.TODO_CREATE_REQUESTED(moduleName), createTodoWithName(moduleName))
    yield takeLatest(constants.TODOS_GET_REQUESTED(moduleName), readTodosWithName(moduleName))
    yield takeLatest(constants.TODO_UPDATE_REQUESTED(moduleName), updateTodoWithName(moduleName))
    yield takeLatest(constants.TODO_DELETE_REQUESTED(moduleName), deleteTodoWithName(moduleName))
  }

  return rootSaga
}
