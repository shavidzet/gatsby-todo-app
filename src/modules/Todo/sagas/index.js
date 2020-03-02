import { call, put, takeLatest, all } from 'redux-saga/effects'
import { actions, constants } from '@src/modules/Todo'
import { api } from '@src/services'

export function * createTodo (action) {
  try {
    const response = yield call(api.addTodo, action.name)
    yield all([
      put(actions.create.success(response)),
      put(actions.read.request())
    ])
  } catch (e) {
    const { response, message } = e
    yield put(actions.create.failure(response, message))
  }
}

export function * readTodos () {
  try {
    const response = yield call(api.fetchTodos)
    yield put(actions.read.success(response))
  } catch (e) {
    const { response, message } = e
    yield put(actions.read.failure(response, message))
  }
}

export function * updateTodo (action) {
  try {
    const response = yield call(api.updateTodo, action.id, action.name)
    yield all([
      put(actions.update.success(response)),
      put(actions.read.request())
    ])
  } catch (e) {
    const { response, message } = e
    yield put(actions.update.failure(response, message))
  }
}

export function * deleteTodo (action) {
  try {
    const response = yield call(api.deleteTodo, action.id, action.name)
    yield all([
      put(actions.deleteIt.success(response)),
      put(actions.read.request())
    ])
  } catch (e) {
    const { response, message } = e
    yield put(actions.deleteIt.failure(response, message))
  }
}

export function * rootSaga () {
  yield takeLatest(constants.TODO_CREATE_REQUESTED, createTodo)
  yield takeLatest(constants.TODOS_GET_REQUESTED, readTodos)
  yield takeLatest(constants.TODO_UPDATE_REQUESTED, updateTodo)
  yield takeLatest(constants.TODO_DELETE_REQUESTED, deleteTodo)
}
