import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import routes from '../common/routes'

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

const render = (location, res) => store => {
  debug(`Render called on ${location} with`)

  match({ routes, location }, (err, redirect, props) => {
    if (!err && redirect) {
      debug(`Redirect to ${redirect.pathname + redirect.search}`)
      res.redirect(redirect.pathname + redirect.search)
      return
    }

    let html = ''
    let state = {}
    if (!err || props) {
      try {
        debug('Try to render')
        state = store.getState()
        html = renderToString(
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>
        )
      } catch (renderError) {
        debug('render to string error', renderError)
      }
    }

    debug('Sent', html, state)
    res.send(renderFullPage(html, state))
  })
}

export default render
