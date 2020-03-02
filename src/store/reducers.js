import { combineReducers } from 'redux'
import { reducers as todos } from '@src/modules/Todo'

export default combineReducers({
  todos
})
