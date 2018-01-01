const debug = require('debug')('backend:index')
const app = require('http').createServer()
const io = require('socket.io')(app)

const bluebird = require('bluebird')
const redis = require('redis')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

// TODO: catch connection error
const client = redis.createClient('6379', process.env.REDIS_HOST || 'redis')

const port = 3000

const emitCounter = name => (counter) => {
  debug('emitting counter', counter)
  io.sockets.emit('counter', {
    name,
    value: Number(counter),
  })
}

io.on('connection', (socket) => {
  debug('incoming connect')
  socket.emit('connected')

  socket.on('get', (name) => {
    debug('incoming event get')
    client.getAsync(`counter:${name}`)
      .then(emitCounter(name))
  })

  socket.on('incr', (name) => {
    debug('incoming event incr')
    client.incrAsync(`counter:${name}`)
      .then(emitCounter(name))
  })

  socket.on('decr', (name) => {
    debug('incoming event decr')
    client.incrbyAsync(`counter:${name}`, -1)
      .then(emitCounter(name))
  })
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on http://localhost:${port}`)
  }
})
