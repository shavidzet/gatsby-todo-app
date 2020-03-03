import { combineReducers } from 'redux'

function allModules (r) {
  return r
    .keys()
    .map(key => r(key))
    .reduce((state, item) => {
      return {
        ...state,
        [item.moduleName]: item.reducer
      }
    }, {})
}

const modules = allModules(require.context('@src/modules/', true, /index.js$/))

export default combineReducers({
  ...modules
})
