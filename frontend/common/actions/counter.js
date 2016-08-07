import * as transport from '../transport'

export const subscribe = () => (dispatch) => {
  transport.counter(value => {
    dispatch({
      type: 'COUNTER',
      value,
    })
  })
}

export const increment = () => () => {
  transport.incr()
}

export const decrement = () => () => {
  transport.decr()
}
