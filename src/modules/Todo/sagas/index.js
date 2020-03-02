import { call, put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import { actions, constants } from '@src/modules/Todo'

const Api = {
  fetchTodos: () => axios.get('https://us-central1-todo-api-e3e2c.cloudfunctions.net/api/todos'),
  addTodo: (name) => axios.post('https://us-central1-todo-api-e3e2c.cloudfunctions.net/api/todo', { name }),
  updateTodo: (id, name) => axios.put(`https://us-central1-todo-api-e3e2c.cloudfunctions.net/api/todo?id=${id}`, { name }),
  deleteTodo: (id, name) => axios.delete(`https://us-central1-todo-api-e3e2c.cloudfunctions.net/api/todo?id=${id}`, { name })
}

const errorStructure = (type, response, message) => ({
  type,
  response,
  message
})

function * throwErrors (...args) {
  yield put(errorStructure(...args))
}

function * createTodo (action) {
  try {
    const response = yield call(Api.addTodo, action.name)
    yield all([
      put(actions.create.success(response)),
      put(actions.read.request())
    ])
  } catch (e) {
    const { response, message } = e
    yield throwErrors(actions.create.failure(response, message))
  }
}

function * readTodos () {
  try {
    const response = yield call(Api.fetchTodos)
    yield put(actions.read.success(response))
  } catch (e) {
    const { response, message } = e
    yield throwErrors(actions.read.failure(response, message))
  }
}

function * updateTodo (action) {
  try {
    const response = yield call(Api.updateTodo, action.id, action.name)
    yield all([
      put(actions.update.success(response)),
      put(actions.read.request())
    ])
  } catch (e) {
    const { response, message } = e
    yield throwErrors(actions.update.failure(response, message))
  }
}

function * deleteTodo (action) {
  try {
    const response = yield call(Api.deleteTodo, action.id, action.name)
    yield all([
      put(actions.deleteIt.success(response)),
      put(actions.read.request())
    ])
  } catch (e) {
    const { response, message } = e
    yield throwErrors(actions.deleteIt.failure(response, message))
  }
}

function * mySaga () {
  yield takeLatest(constants.TODO_CREATE_REQUESTED, createTodo)
  yield takeLatest(constants.TODOS_GET_REQUESTED, readTodos)
  yield takeLatest(constants.TODO_UPDATE_REQUESTED, updateTodo)
  yield takeLatest(constants.TODO_DELETE_REQUESTED, deleteTodo)
}

export default mySaga
