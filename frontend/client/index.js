import 'babel-polyfill'
import ReactDOM from 'react-dom'

import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'

import store from '../common/store'
import { subscribe } from '../common/actions/counter'
import root from './Root'

const debug = require('debug')('frontend:client:index')

store.dispatch(subscribe())
const history = syncHistoryWithStore(
  browserHistory,
  store,
)

const container = document.getElementById('app')

debug('Root loaded')
ReactDOM.render(
  root(store, history),
  container,
)

if (module.hot) {
  module.hot.accept('./Root', () => {
    const nextRoot = require('./Root').default

    debug('NextRoot loaded')
    ReactDOM.render(
      nextRoot(store, history),
      container,
    )
  })
}
