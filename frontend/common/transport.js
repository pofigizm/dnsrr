import io from 'socket.io-client'

const host = process.env.BROWSER ? window.location.origin : 'http://nginx'
const socket = io(`${host}:8020`)

socket.on('connect_error', () => {
  console.log('connection failed')
})

socket.on('connect', function() {
  console.log('connected')
});

export const counter = handler => {
  socket.on('counter', data => {
    if (true) handler(data)
  })
}

export const incr = value => {
  socket.emit('incr', value)
}

export const decr = value => {
  socket.emit('decr', value)
}

