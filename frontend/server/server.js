/* eslint-disable global-require */
import path from 'path'
import Express from 'express'

import store from '../common/store'
import { subscribe } from '../common/actions/counter'
import render from './render'

const debug = require('debug')('frontend:server:server')

const app = new Express()
const port = 8080

store.dispatch(subscribe())

const handleRender = (req, res) => {
  debug('Function handlerRender')
  render(req.url, res)(store)
}

if (process.env.NODE_ENV === 'production') {
  app.use('/static', Express.static(path.join(__dirname, '..', 'dist')))
} else {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware') // eslint-disable-line
  const webpackHotMiddleware = require('webpack-hot-middleware') // eslint-disable-line
  const webpackConfig = require('../webpack.config')

  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {
    color: true,
    hot: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }))
  app.use(webpackHotMiddleware(compiler))
}

app.use(handleRender)

app.listen(port, (error) => {
  if (error) {
    debug('HTTP listen error', error)
  } else {
    debug(`HTTP listen on port:${port}`)
  }
})
