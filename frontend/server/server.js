import Express from 'express'
import qs from 'qs' // eslint-disable-line

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import api from './api'
import render from './render'

const debug = require('debug')('frontend:server:server')

const app = new Express()
const port = 8080

const handleRender = (req, res) => {
  debug('Function handlerRender')
  api.call()
    .then(result => {
      const state = { counter: result || 0 }
      res.send(render(state))
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
    debug('HTTP listen error', error)
  } else {
    debug(`HTTP listen on port:${port}`)
  }
})
