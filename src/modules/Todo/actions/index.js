import { constants } from '@src/modules/Todo'

export const action = (type, payload = {}) =>
  ({ type, ...payload })

export const create = {
  request: name => action(constants.TODO_CREATE_REQUESTED, {
    name
  }),
  success: (response) => action(constants.TODO_CREATE_SUCCEEDED, {
    response
  }),
  failure: (response, message) => action(constants.TODO_CREATE_FAILED, {
    response,
    message
  })
}

export const read = {
  request: () => action(constants.TODOS_GET_REQUESTED),
  success: (response) => action(constants.TODOS_GET_SUCCEEDED, {
    response
  }),
  failure: (response, message) => action(constants.TODOS_GET_FAILED, {
    response,
    message
  })
}

export const update = {
  request: (id, name) => action(constants.TODO_UPDATE_REQUESTED, {
    id,
    name
  }),
  success: (response) => action(constants.TODO_UPDATE_SUCCEEDED, {
    response
  }),
  failure: (response, message) => action(constants.TODO_UPDATE_FAILED, {
    response,
    message
  })
}

export const deleteIt = {
  request: (id) => action(constants.TODO_DELETE_REQUESTED, {
    id
  }),
  success: (response) => action(constants.TODO_DELETE_SUCCEEDED, {
    response
  }),
  failure: (response, message) => action(constants.TODO_DELETE_FAILED, {
    response,
    message
  })
}
