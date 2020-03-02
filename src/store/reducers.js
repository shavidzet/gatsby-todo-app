import { combineReducers } from 'redux'

export default combineReducers({
  test: (state = {}, action) => ({ message: 'hello world' })
})
