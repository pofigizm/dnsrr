import io from 'socket.io-client'

const debug = require('debug')('frontend:common:transport')

const host = __BROWSER__ ? window.location.origin : 'http://nginx'
const socket = io(process.env.API_HOST || host, { path: '/ws/socket.io' })

socket.on('connect_error', () => {
  debug('connection failed')
})

socket.on('connect', () => {
  debug('connected')
})

export const counter = handler => {
  socket.on('counter', data => {
    if (true) handler(data)
  })
}

export const get = value => {
  socket.emit('get', value)
}

export const incr = value => {
  socket.emit('incr', value)
}

export const decr = value => {
  socket.emit('decr', value)
}

