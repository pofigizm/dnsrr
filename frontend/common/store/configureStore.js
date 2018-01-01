import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'
import * as api from '../api'

const configureStore = (history, initialState) => {
  const middlewareList = [
    thunk.withExtraArgument({ api }),
    routerMiddleware(history),
  ]

  const middlewares = applyMiddleware(...middlewareList)
  // eslint-disable-next-line no-underscore-dangle
  const devTools = __BROWSER__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  const composeEnhancers = __DEV__ && devTools ? devTools : compose
  const enhancers = composeEnhancers(middlewares)
  const store = createStore(rootReducer, initialState, enhancers)

  if (__BROWSER__ && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
