import { combineReducers } from 'redux'
import { getAllModuleReducers } from '@src/helpers'

export default combineReducers({
  ...getAllModuleReducers()
})
