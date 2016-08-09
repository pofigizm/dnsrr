import { counter } from '../common/transport'

const state = {
  counter: 0,
}

const api = {
  call: () => Promise.resolve(state.counter),
}

// listen socket event via common/transport
counter(value => {
  state.counter = value
})

export default api
