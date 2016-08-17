/* eslint-disable import/no-extraneous-dependencies */
const test = require('tape')

const bluebird = require('bluebird')
const redis = require('redis')
const io = require('socket.io-client')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const client = redis.createClient('6379', '127.0.0.1')

const before = () => Promise.resolve()
  .then(() => client.flushallAsync())
  .then(() => client.incrAsync('counter:one'))
  .then(() => client.incrAsync('counter:two'))

const socket = io('http://localhost:3000')

test('connect', t => {
  t.plan(1)

  socket.on('connect', () => {
    t.equal(true, true)
  })
})

test('get', t => {
  t.plan(1)

  before()
    .then(() => socket.emit('get', 'one'))

  socket.on('counter', value => {
    t.deepEqual(value, {
      name: 'one',
      value: 1,
    })
    socket.removeAllListeners('counter')
  })
})

test('incrOne', t => {
  t.plan(1)

  before()
    .then(() => socket.emit('incr', 'one'))

  socket.on('counter', value => {
    t.deepEqual(value, {
      name: 'one',
      value: 2,
    })
    socket.removeAllListeners('counter')
  })
})

test('incrTwo', t => {
  t.plan(1)

  before()
    .then(() => socket.emit('incr', 'two'))

  socket.on('counter', value => {
    t.deepEqual(value, {
      name: 'two',
      value: 2,
    })
    socket.removeAllListeners('counter')
  })
})

test('decr', t => {
  t.plan(1)

  before()
    .then(() => socket.emit('decr', 'one'))

  socket.on('counter', value => {
    t.deepEqual(value, {
      name: 'one',
      value: 0,
    })
    socket.removeAllListeners('counter')
  })
})

test('disconnect', t => {
  t.plan(1)

  socket.on('disconnect', () => {
    t.equal(true, true)
  })

  socket.disconnect()
  client.quit()
})
