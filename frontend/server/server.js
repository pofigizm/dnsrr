import Express from 'express'
import qs from 'qs' // eslint-disable-line

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'
import { counter } from '../common/transport'

const app = new Express()
const port = 8080

// TODO: refactor it
const serverState = {
  counter: 0,
}
counter(value => {
  serverState.counter = value
})
const fetchData = () => Promise.resolve(serverState.counter)

const renderFullPage = (html, preloadedState) => (`
  <!doctype html>
  <html>
    <head>
      <title>DNSPP boilerplate</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
      </script>
      <script src="/static/bundle.js"></script>
    </body>
  </html>
`)


const handleRender = (req, res) => {
  fetchData()
    .then(apiResult => {
      const preloadedState = { counter: apiResult || 0 }
      const store = configureStore(preloadedState)
      const html = renderToString(
        <Provider store={store}>
          <App />
        </Provider>
      )

      const finalState = store.getState()
      res.send(renderFullPage(html, finalState))
    })
}

const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}))
app.use(webpackHotMiddleware(compiler))
app.use(handleRender)

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on http://localhost:${port}`)
  }
})
