import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import mySaga from '@src/sagas'
import rootReducer from '@src/store/reducers'

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  storage,
  whitelist: []
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

export const persistor = persistStore(store)

sagaMiddleware.run(mySaga)
