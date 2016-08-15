export const subscribe = () => (dispatch, getState, { api }) => {
  api.counter(value => {
    dispatch({
      type: 'COUNTER',
      value,
    })
  })
}

export const increment = () => (dispatch, getState, { api }) => {
  api.incr()
}

export const decrement = () => (dispatch, getState, { api }) => {
  api.decr()
}
