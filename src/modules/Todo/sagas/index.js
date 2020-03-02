import { call, put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import { actions, constants } from '@src/modules/Todo'

const Api = {
  fetchTodos: () => axios.get('https://us-central1-todo-api-e3e2c.cloudfunctions.net/api/todos'),
  addTodo: (name) => axios.post('https://us-central1-todo-api-e3e2c.cloudfunctions.net/api/todo', { name }),
  updateTodo: (id, name) => axios.put(`https://us-central1-todo-api-e3e2c.cloudfunctions.net/api/todo?id=${id}`, { name }),
  deleteTodo: (id, name) => axios.delete(`https://us-central1-todo-api-e3e2c.cloudfunctions.net/api/todo?id=${id}`, { name })
}

export function * createTodo (action) {
  try {
    const response = yield call(Api.addTodo, action.name)
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
    const response = yield call(Api.fetchTodos)
    yield put(actions.read.success(response))
  } catch (e) {
    const { response, message } = e
    yield put(actions.read.failure(response, message))
  }
}

export function * updateTodo (action) {
  try {
    const response = yield call(Api.updateTodo, action.id, action.name)
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
    const response = yield call(Api.deleteTodo, action.id, action.name)
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
