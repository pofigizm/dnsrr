/* eslint-disable no-underscore-dangle */
global.__BROWSER__ = false
global.__DEV__ = (process.env.NODE_ENV || 'development') === 'development'

require('babel-register')
require('./server')
