import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'

const debug = require('debug')('frontend:server:render')

const renderFullPage = (html, state) => (`
  <!doctype html>
  <html>
    <head>
      <title>DNSPP boilerplate</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\x3c')}
      </script>
      <script src="/static/bundle.js"></script>
    </body>
  </html>
`)

const render = state => {
  debug('Render called with', state)

  const store = configureStore(state)
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  return renderFullPage(html, store.getState())
}

export default render
