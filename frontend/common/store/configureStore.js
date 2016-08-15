import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'
import * as api from '../api'

const configureStore = (history, initialState) => {
  let middlewareList = [
    thunk.withExtraArgument({ api }),
    routerMiddleware(history),
  ]

  if (__BROWSER__ && __DEV__) {
    middlewareList = middlewareList
      .concat(require('redux-logger')({
        level: 'info',
        collapsed: true,
      }))
  }
  const middlewares = applyMiddleware(...middlewareList)
  const devTool = __BROWSER__ ? window.devToolsExtension : false
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      middlewares,
      __DEV__ && devTool ? devTool() : f => f,
    )
  )

  if (__BROWSER__ && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
