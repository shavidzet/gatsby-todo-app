import { constants } from '@src/modules-creator/Todo'

const action = (type, payload = {}) =>
  ({ type, ...payload })

export const create = (moduleName) => ({
  request: name =>
    action(constants.TODO_CREATE_REQUESTED(moduleName), {
      name
    }),
  success: (response) =>
    action(constants.TODO_CREATE_SUCCEEDED(moduleName), {
      response
    }),
  failure: (response, message) =>
    action(constants.TODO_CREATE_FAILED(moduleName), {
      response,
      message
    })
})

export const read = (moduleName) => ({
  request: () =>
    action(constants.TODOS_GET_REQUESTED(moduleName)),
  success: (response) =>
    action(constants.TODOS_GET_SUCCEEDED(moduleName), {
      response
    }),
  failure: (response, message) =>
    action(constants.TODOS_GET_FAILED(moduleName), {
      response,
      message
    })
})

export const update = (moduleName) => ({
  request: (id, name) =>
    action(constants.TODO_UPDATE_REQUESTED(moduleName), {
      id,
      name
    }),
  success: (response) =>
    action(constants.TODO_UPDATE_SUCCEEDED(moduleName), {
      response
    }),
  failure: (response, message) =>
    action(constants.TODO_UPDATE_FAILED(moduleName), {
      response,
      message
    })
})

export const deleteIt = (moduleName) => ({
  request: (id) =>
    action(constants.TODO_DELETE_REQUESTED(moduleName), {
      id
    }),
  success: (response) =>
    action(constants.TODO_DELETE_SUCCEEDED(moduleName), {
      response
    }),
  failure: (response, message) =>
    action(constants.TODO_DELETE_FAILED(moduleName), {
      response,
      message
    })
})
