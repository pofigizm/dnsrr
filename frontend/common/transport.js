import io from 'socket.io-client'

const host = process.env.BROWSER ? window.location.origin : 'http://nginx'
const socket = io(process.env.API_HOST || host, { path: '/ws/socket.io' })

socket.on('connect_error', () => {
  console.log('connection failed')
})

socket.on('connect', () => {
  console.log('connected')
})

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

