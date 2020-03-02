import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import Layout from './components/Layout'

export const App = ({ element }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistor}>
        <Layout>{element}</Layout>
      </PersistGate>
    </Provider>
  )
}

App.propTypes = {
  element: PropTypes.number.isRequired
}

export default App
