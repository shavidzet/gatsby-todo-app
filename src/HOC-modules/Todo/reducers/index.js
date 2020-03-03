import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { constants } from '@src/HOC-modules/Todo'

export const createTodoWithName = (name) => {
  const createTodoInitialState = {
    isFetching: false,
    isError: false,
    response: {
      status: '',
      data: '',
      errorMessage: ''
    }
  }

  const createTodo = (state = createTodoInitialState, action) => {
    switch (action.type) {
      case constants.TODO_CREATE_REQUESTED(name):
        return {
          ...createTodoInitialState,
          isFetching: true
        }
      case constants.TODO_CREATE_SUCCEEDED(name):
        return {
          ...createTodoInitialState,
          response: {
            ...createTodoInitialState.response,
            status: action.response.status,
            data: action.response.data
          }
        }
      case constants.TODO_CREATE_FAILED(name):
        return {
          ...createTodoInitialState,
          isError: true,
          response: {
            ...createTodoInitialState.response,
            status: action.response.status,
            data: action.response.data,
            errorMessage: action.message
          }
        }
      default:
        return state
    }
  }

  return createTodo
}

export const getTodosWithName = (name) => {
  const getTodosInitialState = {
    isFetching: false,
    isError: false,
    response: {
      status: '',
      data: [],
      errorMessage: ''
    }
  }

  const getTodos = (state = getTodosInitialState, action) => {
    switch (action.type) {
      case constants.TODOS_GET_REQUESTED(name):
        return {
          ...getTodosInitialState,
          isFetching: true,
          response: {
            ...getTodosInitialState.response,
            data: state.response.data
          }
        }
      case constants.TODOS_GET_SUCCEEDED(name):
        return {
          ...getTodosInitialState,
          response: {
            ...getTodosInitialState.response,
            status: action.response.status,
            data: Object
              .entries(action.response.data || [])
              .map(([id, todo]) =>
                ({ id, ...todo })
              )
          }
        }
      case constants.TODOS_GET_FAILED(name):
        return {
          ...getTodosInitialState,
          isError: true,
          response: {
            ...getTodosInitialState.response,
            status: action.response.status,
            data: action.response.data,
            errorMessage: action.message
          }
        }
      default:
        return state
    }
  }

  return getTodos
}

export const updateTodoWithName = (name) => {
  const updateTodoInitialState = {
    isFetching: false,
    isError: false,
    response: {
      status: '',
      data: '',
      errorMessage: ''
    }
  }

  const updateTodo = (state = updateTodoInitialState, action) => {
    switch (action.type) {
      case constants.TODO_UPDATE_REQUESTED(name):
        return {
          ...updateTodoInitialState,
          isFetching: true
        }
      case constants.TODO_UPDATE_SUCCEEDED(name):
        return {
          ...updateTodoInitialState,
          response: {
            ...updateTodoInitialState.response,
            status: action.response.status,
            data: action.response.data
          }
        }
      case constants.TODO_UPDATE_FAILED(name):
        return {
          ...updateTodoInitialState,
          isError: true,
          response: {
            ...updateTodoInitialState.response,
            status: action.response.status,
            data: action.response.data,
            errorMessage: action.message
          }
        }
      default:
        return state
    }
  }

  return updateTodo
}

export const deleteTodoWithName = (name) => {
  const deleteTodoInitialState = {
    isFetching: false,
    isError: false,
    response: {
      status: '',
      data: '',
      errorMessage: ''
    }
  }

  const deleteTodo = (state = deleteTodoInitialState, action) => {
    switch (action.type) {
      case constants.TODO_DELETE_REQUESTED(name):
        return {
          ...deleteTodoInitialState,
          isFetching: true
        }
      case constants.TODO_DELETE_SUCCEEDED(name):
        return {
          ...deleteTodoInitialState,
          response: {
            ...deleteTodoInitialState.response,
            status: action.response.status,
            data: action.response.data
          }
        }
      case constants.TODO_DELETE_FAILED(name):
        return {
          ...deleteTodoInitialState,
          isError: true,
          response: {
            ...deleteTodoInitialState.response,
            status: action.response.status,
            data: action.response.data,
            errorMessage: action.message
          }
        }
      default:
        return state
    }
  }

  return deleteTodo
}

export const rootReducerWithName = (name) => {
  const authPersistConfig = {
    key: 'todos.createTodo',
    storage: storage
  }

  const rootReducer = combineReducers({
    createTodo: createTodoWithName(name),
    getTodos: persistReducer(authPersistConfig, getTodosWithName(name)),
    updateTodo: updateTodoWithName(name),
    deleteTodo: deleteTodoWithName(name)
  })

  return rootReducer
}
