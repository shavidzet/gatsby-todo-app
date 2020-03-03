export const getAllModules = () => {
  function allModules (r) {
    return r
      .keys()
      .map(key => r(key))
  }

  const modules = allModules(require.context('@src/modules/', true, /index.js$/))

  return modules
}

export const getAllModuleReducers = () => {
  const buildReducer = (state, module) => ({
    ...state,
    [module.moduleName]: module.reducer
  })

  const moduleReducers = getAllModules()
    .reduce(buildReducer, {})

  return moduleReducers
}

export const getAllModuleSagas = () => {
  const buildSaga = (module) =>
    module.saga()

  const moduleSagas = getAllModules()
    .map(buildSaga)

  return moduleSagas
}
