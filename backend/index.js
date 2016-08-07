const debug = require('debug')('backend:index')
const app = require('http').createServer()
const io = require('socket.io')(app)

const bluebird = require('bluebird')
const redis = require('redis')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

// TODO: catch connection error
const client = redis.createClient('6379', 'redis')

const port = 3000

const emitCounter = counter => {
  debug('emitting counter', counter)
  io.sockets.emit('counter', Number(counter))
}

io.on('connection', socket => {
  debug('incoming connect')
  socket.emit('connected')
  client.getAsync('counter').then(emitCounter)

  socket.on('get', () => {
    debug('incoming event get')
    client.getAsync('counter').then(emitCounter)
  })

  socket.on('incr', () => {
    debug('incoming event incr')
    client.incrAsync('counter').then(emitCounter)
  })

  socket.on('decr', () => {
    debug('incoming event decr')
    client.incrbyAsync('counter', -1).then(emitCounter)
  })
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on http://localhost:${port}`)
  }
})
