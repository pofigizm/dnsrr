/* eslint-disable global-require */
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import configureStore from '../common/store/configureStore'
import { subscribe } from '../common/actions/counter'
import Root from '../common/Root'

const debug = require('debug')('frontend:client:index')

const preloadedState = window.__PRELOADED_STATE__ // eslint-disable-line
const store = configureStore(preloadedState)
store.dispatch(subscribe())

const container = document.getElementById('app')

debug('Root loaded')
ReactDOM.render(
  <AppContainer>
    <Root {...{ store, history }} />
  </AppContainer>,
  container,
)

if (module.hot) {
  module.hot.accept('../common/Root', () => {
    const NextRoot = require('../common/Root').default

    debug('NextRoot loaded')
    ReactDOM.render(
      <AppContainer>
        <NextRoot {...{ store, history }} />
      </AppContainer>,
      container,
    )
  })
}
